import { NextFunction, Request, Response } from "express";
import { IUser } from "../../../shared/types";
import { db } from "../db";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ userId: number }> = req.body;

  if (data.userId === undefined || typeof data.userId !== "number") return res.status(404).send({});

  const { result, err } = await db.query(`
    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE id=?
  `, [data.userId]);

  if (result.length === 0 || err) return res.status(404).send({});

  const user: IUser = {
    id: result[0].id,
    name: result[0].username,
    tag: result[0].usertag,
    date: result[0].date,
    bio: result[0].bio,
    followingCount: result[0].following_count,
    followerCount: result[0].follower_count,
    following: await isUserFollowed(userId, result[0].id),
    follower: await isUserFollowed(result[0].id, userId),
  }

  return res.status(200).send({ user });
}

async function getUserByTag(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ usertag: number }> = req.body;

  if (data.usertag === undefined || typeof data.usertag !== "string") return res.status(404).send({});

  const { result, err } = await db.query(`
    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE usertag=?
  `, [data.usertag]);

  if (result.length === 0 || err) return res.status(404).send({});

  const user: IUser = {
    id: result[0].id,
    name: result[0].username,
    tag: result[0].usertag,
    date: result[0].date,
    bio: result[0].bio,
    followingCount: result[0].following_count,
    followerCount: result[0].follower_count,
    following: await isUserFollowed(userId, result[0].id),
    follower: await isUserFollowed(result[0].id, userId),
  }

  return res.status(200).send({ user });
}

async function searchUser(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ user: string }> = req.body;

  if (data.user === undefined || typeof data.user !== "string") return res.status(404).send({});
  if (data.user.length === 0 || data.user.length > 32) return res.status(404).send({});

  const both = !(data.user.length > 16);
  data.user += "%";

  const { result, err } = await db.query(`
    SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
    WHERE username LIKE ? ${both ? "OR usertag LIKE ?" : ""}
    ORDER BY id DESC
    LIMIT 10
  `, [data.user, data.user]);

  if (err || result.length === 0) return res.status(404).send({});
  return res.status(200).send({ users: await normalizeUsers(result, userId) });
}

async function followUser(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ userId: number }> = req.body;

  // Check if data is undefined
  if (data.userId === undefined || typeof data.userId !== "number") return res.status(404).send({});

  // Check if trying to follow itself
  if (data.userId === userId) return res.status(404).send({});

  let state = await isUserFollowed(userId, data.userId);

  const { result: result1, err: err1 } = state ?
    await db.query(`DELETE FROM follow WHERE follower_id =? AND following_id =? `, [userId, data.userId]) :
    await db.query(`INSERT INTO follow(follower_id, following_id) VALUES(?, ?)`, [userId, data.userId]);
  if (err1 || result1.affectedRows === 0) return res.status(404).send({});

  const { err: err2 } = state ?
    await db.query(`
      UPDATE user SET follower_count = follower_count - 1 WHERE id =?;
      UPDATE user SET following_count = following_count - 1 WHERE id =?;
`, [data.userId, userId]) :
    await db.query(`
      UPDATE user SET follower_count = follower_count + 1 WHERE id =?;
      UPDATE user SET following_count = following_count + 1 WHERE id =?;
`, [data.userId, userId])
  if (err2) return res.status(404).send({});

  return res.status(200).send({ state: !state });
}

async function getUserFollowers(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{
    userId: number,
    anchor: number,
    type: "newer" | "older"
  }> = req.body;

  // Check if data is undefined
  if (data.userId === undefined || typeof data.userId !== "number") return res.status(404).send({});
  if (data.anchor === undefined || typeof data.anchor !== "number") return res.status(404).send({});
  if (data.type === undefined || typeof data.type !== "string") return res.status(404).send({});

  const values = [data.userId];
  if (data.anchor !== -1) values.push(data.anchor);

  const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
      WHERE id IN(SELECT follower_id FROM follow WHERE following_id =?)
      ${data.anchor === -1 ? "" : data.type === "newer" ? "AND user.id>?" : "AND user.id<?"}
      ORDER BY user.id ${data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC"}
      LIMIT 25
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ users: await normalizeUsers(result, userId) });
}

async function getUserFollowings(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{
    userId: number,
    anchor: number,
    type: "newer" | "older"
  }> = req.body;

  // Check if data is undefined
  if (data.userId === undefined || typeof data.userId !== "number") return res.status(404).send({});
  if (data.anchor === undefined || typeof data.anchor !== "number") return res.status(404).send({});
  if (data.type === undefined || typeof data.type !== "string") return res.status(404).send({});

  const values = [data.userId];
  if (data.anchor !== -1) values.push(data.anchor);

  const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
      WHERE id IN(SELECT following_id FROM follow WHERE follower_id =?)
      ${data.anchor === -1 ? "" : data.type === "newer" ? "AND user.id>?" : "AND user.id<?"}
      ORDER BY user.id ${data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC"}
      LIMIT 25
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ users: await normalizeUsers(result, userId) });
}

async function editUser(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{
    username: string,
    bio: string
  }> = req.body;

  // Check if data is undefined
  if (data.username === undefined || typeof data.username !== "string") return res.status(404).send({});
  if (data.bio === undefined || typeof data.bio !== "string") return res.status(404).send({});

  const username = data.username.trim();
  const bio = data.bio.trim();

  if (username.length === 0 || username.length > 32) return res.status(404).send({});
  if (bio.length > 256) return res.status(404).send({});

  const { result, err } = await db.query(`
    UPDATE user SET username =?, bio =? WHERE id =?
  `, [username, bio, userId]);

  if (err) return res.status(404).send({});
  return res.status(200).send({});
}

async function isUserFollowed(followerId: number, followingId: number): Promise<boolean> {
  const { result, err } = await db.query(`
    SELECT id FROM follow WHERE follower_id =? AND following_id =?
  `, [followerId, followingId]);

  if (err || result.length === 0) return false;
  return true;
}

async function normalizeUsers(users: any, userId: number): Promise<IUser[]> {
  const normalized: IUser[] = [];

  for (let i = 0; i < users.length; ++i) {
    const user = users[i];

    normalized.push({
      id: user.id,
      bio: user.bio,
      tag: user.usertag,
      name: user.username,
      date: user.date,
      followerCount: user.follower_count,
      followingCount: user.following_count,
      following: await isUserFollowed(userId, user.id),
      follower: await isUserFollowed(user.id, userId),
    });
  }

  return normalized;
}


export default {
  getUserById,
  getUserByTag,
  searchUser,
  followUser,
  getUserFollowers,
  getUserFollowings,
  editUser,
}