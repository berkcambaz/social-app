import { NextFunction, Request, Response } from "express";
import { IUser } from "../../../shared/types";
import { db } from "../db";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ userId: number }> = req.body;

  if (data.userId === undefined) return res.status(404).send({});

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
    follower: false,
  }

  return res.status(200).send({ user });
}

async function getUserByTag(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ usertag: number }> = req.body;

  if (data.usertag === undefined) return res.status(404).send({});

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
    follower: false,
  }

  return res.status(200).send({ user });
}

async function followUser(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ userId: number }> = req.body;

  // Check if data is undefined
  if (data.userId === undefined) return res.status(404).send({});

  let { result, err } = await db.query(`
    SELECT id FROM follow WHERE follower_id=? AND following_id=?
  `, [userId, data.userId]);

  if (err) return res.status(404).send({});

  let state = result.length !== 0;

  let { result: result1, err: err1 } = state ?
    await db.query(`
      DELETE FROM follow WHERE follower_id=? AND following_id=?;
      UPDATE user SET follower_count=follower_count-1 WHERE id=?;
      UPDATE user SET following_count=following_count-1 WHERE id=?;
    `, [userId, data.userId, data.userId, userId]) :
    await db.query(`
      INSERT INTO follow (follower_id, following_id) VALUES (?, ?);
      UPDATE user SET follower_count=follower_count+1 WHERE id=?;
      UPDATE user SET following_count=following_count+1 WHERE id=?;
    `, [userId, data.userId, data.userId, userId])

  if (err1) return res.status(404).send({});

  return res.status(200).send({ state: !state });
}

async function isUserFollowed(followerId: number, followingId: number): Promise<boolean> {
  const { result, err } = await db.query(`
    SELECT id FROM follow WHERE follower_id=? AND following_id=?
  `, [followerId, followingId]);

  if (err || result.length === 0) return false;
  return true;
}

export default {
  getUserById,
  getUserByTag,
  followUser,
}