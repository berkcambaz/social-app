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
    following: false,
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
    following: false,
    follower: false,
  }

  return res.status(200).send({ user });
}

export default {
  getUserById,
  getUserByTag,
}