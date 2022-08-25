import { NextFunction, Request, Response } from "express";
import { IPost } from "../../../shared/types";
import { db } from "../db";
import { utcTimestamp } from "../utility";

async function postPost(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ content: string }> = req.body;

  // Check if data is undefined
  if (data.content === undefined) return res.status(404).send({});

  // Content length should be 0 (excluded) - 256 (included)
  if (data.content.length === 0 || data.content.length > 256) return res.status(404).send({});

  const date = utcTimestamp();

  const { result, err } = await db.query(`
      INSERT INTO post (user_id, date, content, like_count)
      VALUES (?, ?, ?, 0)
    `, [userId, date, data.content]);

  if (err) return res.status(404).send({});
  const post: IPost = {
    id: result.insertId,
    userId: userId,
    date: date,
    content: data.content,
    likeCount: 0,
    liked: false,
    bookmarked: false,
  }
  return res.status(200).send({ post });
}

async function getFeedPosts(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ anchor: number, type: "newer" | "older" }> = req.body;

  // Check if data is undefined
  if (data.anchor === undefined) return res.status(404).send({});
  if (data.type === undefined) return res.status(404).send({});

  const values = [userId, userId];
  if (data.anchor !== -1) values.push(data.anchor);
  const { result, err } = await db.query(`
      SELECT id, user_id, date, content, like_count FROM post
      WHERE user_id in (SELECT following_id FROM follow WHERE follower_id=?) OR post.user_id=?
      ${data.anchor === -1 ? "" : data.type === "newer" ? "WHERE id>?" : "WHERE id<?"}
      ORDER BY post.id ${data.type === "newer" ? "DESC" : "ASC"}
      LIMIT 25 
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ posts: normalizePosts(result) });
}

async function getUserPosts(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ userId: number, anchor: number, type: "newer" | "older" }> = req.body;

  // Check if data is undefined
  if (data.userId === undefined) return res.status(404).send({});
  if (data.anchor === undefined) return res.status(404).send({});
  if (data.type === undefined) return res.status(404).send({});

  const values = [data.userId];
  if (data.anchor !== -1) values.push(data.anchor);
  const { result, err } = await db.query(`
      SELECT id, user_id, date, content, like_count FROM post
      WHERE user_id=?
      ${data.anchor === -1 ? "" : data.type === "newer" ? "AND WHERE id>?" : "AND WHERE id<?"}
      ORDER BY post.id ${data.type === "newer" ? "DESC" : "ASC"}
      LIMIT 25 
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ posts: normalizePosts(result) });
}

function normalizePosts(posts: any) {
  const normalized: IPost[] = [];

  posts.forEach((post: any) => {
    normalized.push({
      id: post.id,
      userId: post.user_id,
      date: post.date,
      content: post.content,
      likeCount: post.like_count,
      liked: false,
      bookmarked: false,
    })
  });

  return normalized;
}

export default {
  getFeedPosts,
  getUserPosts,
  postPost,
}