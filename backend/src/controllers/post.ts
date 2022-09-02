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
  if (data.content === undefined || typeof data.content !== "string")
    return res.status(404).send({});

  const content = data.content.trim();
  const date = utcTimestamp();

  // Content length should be 0 (excluded) - 256 (included)
  if (content.length === 0 || content.length > 256) return res.status(404).send({});

  const { result, err } = await db.query(`
      INSERT INTO post (user_id, date, content, like_count)
      VALUES (?, ?, ?, 0)
    `, [userId, date, content]);

  if (err) return res.status(404).send({});
  const post: IPost = {
    id: result.insertId,
    userId: userId,
    date: date,
    content: content,
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

  const data: Partial<{
    anchor: number,
    type: "newer" | "older"
  }> = req.body;

  // Check if data is undefined
  if (data.anchor === undefined || typeof data.anchor !== "number") return res.status(404).send({});
  if (data.type === undefined || typeof data.type !== "string") return res.status(404).send({});

  const values = [userId, userId];
  if (data.anchor !== -1) values.push(data.anchor);

  const { result, err } = await db.query(`
      SELECT id, user_id, date, content, like_count FROM post
      WHERE (user_id in (SELECT following_id FROM follow WHERE follower_id=?) OR post.user_id=?)
      ${data.anchor === -1 ? "" : data.type === "newer" ? "AND post.id>?" : "AND post.id<?"}
      ORDER BY post.id ${data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC"}
      LIMIT 25 
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ posts: await normalizePosts(result, userId) });
}

async function getUserPosts(req: Request, res: Response, next: NextFunction) {
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
      SELECT id, user_id, date, content, like_count FROM post
      WHERE user_id=?
      ${data.anchor === -1 ? "" : data.type === "newer" ? "AND post.id>?" : "AND post.id<?"}
      ORDER BY post.id ${data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC"}
      LIMIT 25 
  `, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ posts: await normalizePosts(result, userId) });
}

async function getBookmarkedPosts(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{
    anchor: number,
    type: "newer" | "older"
  }> = req.body;

  // Check if data is undefined
  if (data.anchor === undefined || typeof data.anchor !== "number") return res.status(404).send({});
  if (data.type === undefined || typeof data.type !== "string") return res.status(404).send({});

  const values = [userId];
  if (data.anchor !== -1) values.push(data.anchor);
  const { result, err } = await db.query(`
    SELECT id, user_id, date, content, like_count FROM post
    WHERE id IN (SELECT post_id FROM post_bookmark WHERE user_id=?)
    ${data.anchor === -1 ? "" : data.type === "newer" ? "AND post.id>?" : "AND post.id<?"}
    ORDER BY post.id ${data.anchor === -1 ? "DESC" : data.type === "newer" ? "ASC" : "DESC"}
    LIMIT 25 
`, values);

  if (err) return res.status(404).send({});
  return res.status(200).send({ posts: await normalizePosts(result, userId) });
}

async function likePost(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ postId: number }> = req.body;

  // Check if data is undefined
  if (data.postId === undefined || typeof data.postId !== "number") return res.status(404).send({});

  const state = await isPostLiked(userId, data.postId);

  const { result: result1, err: err1 } = state ?
    await db.query(`DELETE FROM post_like WHERE user_id=? AND post_id=?`, [userId, data.postId]) :
    await db.query(`INSERT INTO post_like (user_id, post_id) VALUES (?, ?)`, [userId, data.postId]);
  if (err1 || result1.affectedRows === 0) return res.status(404).send({});

  const { err: err2 } = state ?
    await db.query(`UPDATE post SET like_count=like_count-1 WHERE id=?`, [data.postId]) :
    await db.query(`UPDATE post SET like_count=like_count+1 WHERE id=?`, [data.postId]);
  if (err2) return res.status(404).send({});

  return res.status(200).send({ state: !state });
}

async function bookmarkPost(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ postId: number }> = req.body;

  // Check if data is undefined
  if (data.postId === undefined || typeof data.postId !== "number") return res.status(404).send({});

  const state = await isPostBookmarked(userId, data.postId);

  let { result, err } = state ?
    await db.query(`
      DELETE FROM post_bookmark WHERE user_id=? AND post_id=?;
    `, [userId, data.postId]) :
    await db.query(`
      INSERT INTO post_bookmark (user_id, post_id) VALUES (?, ?);
    `, [userId, data.postId])

  if (err) return res.status(404).send({});
  return res.status(200).send({ state: !state });
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  const data: Partial<{ postId: number }> = req.body;

  // Check if data is undefined
  if (data.postId === undefined || typeof data.postId !== "number") return res.status(404).send({});

  // Delete post, post's likes and bookmarks
  const { result, err } = await db.query(`
    DELETE FROM post WHERE id=? AND user_id=?;
    DELETE FROM post_like WHERE user_id=? AND post_id=?;
    DELETE FROM post_bookmark WHERE user_id=? AND post_id=?;
  `, [data.postId, userId, userId, data.postId, userId, data.postId]);

  if (err) return res.status(404).send({});
  return res.status(200).send({});
}

async function isPostLiked(userId: number, postId: number): Promise<boolean> {
  const { result, err } = await db.query(`
    SELECT id FROM post_like WHERE user_id=? AND post_id=?
  `, [userId, postId]);

  if (err || result.length === 0) return false;
  return true;
}

async function isPostBookmarked(userId: number, postId: number): Promise<boolean> {
  const { result, err } = await db.query(`
    SELECT id FROM post_bookmark WHERE user_id=? AND post_id=?
  `, [userId, postId]);

  if (err || result.length === 0) return false;
  return true;
}

async function normalizePosts(posts: any, userId: number): Promise<IPost[]> {
  const normalized: IPost[] = [];

  for (let i = 0; i < posts.length; ++i) {
    const post = posts[i];

    normalized.push({
      id: post.id,
      userId: post.user_id,
      date: post.date,
      content: post.content,
      likeCount: post.like_count,
      liked: await isPostLiked(userId, post.id),
      bookmarked: await isPostBookmarked(userId, post.id),
    });
  }

  return normalized;
}

export default {
  getFeedPosts,
  getUserPosts,
  getBookmarkedPosts,
  postPost,
  likePost,
  bookmarkPost,
  deletePost,
}