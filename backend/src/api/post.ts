import { ApiCode, ApiError, ApiReq, IPost } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";
import { utcTimestamp } from "../utility";

export class Post {
  public static async post(req: ReqType, res: ResType, data: ApiReq[ApiCode.PostPost], userId: number) {
    const content = data.content;

    // If content is more than 256 or equal to 0
    if (content.length > 256) return res.send({ err: ApiError.PostPostFail });
    if (content.length === 0) return res.send({ err: ApiError.PostPostFail });

    const date = utcTimestamp();

    const { result, err } = await db.query(`
      INSERT INTO post (user_id, date, content, like_count)
      VALUES (?, ?, ?, 0)
    `, [userId, date, content]);

    if (err) return res.send({ err: ApiError.PostPostFail });

    const post: IPost = {
      id: result.insertId,
      userId: userId,
      date: date,
      content: content,
      likeCount: 0,
      liked: false,
      bookmarked: false
    };
    res.send({ data: { post: post } });
  }

  public static async get(req: ReqType, res: ResType, data: ApiReq[ApiCode.GetPost], userId: number) {
    const values = [userId, userId];
    if (data.anchor !== -1) values.push(data.anchor);

    const { result, err } = await db.query(`
      SELECT id, user_id, date, content, like_count FROM post
      WHERE user_id in (SELECT following_id FROM follow WHERE follower_id=?) OR post.user_id=?
      ${data.anchor === -1 ? "" : data.type === "newer" ? "WHERE id>?" : "WHERE id<?"}
      ORDER BY post.id ${data.type === "newer" ? "DESC" : "ASC"}
      LIMIT 25 
    `, values);

    if (err) return res.send({ err: ApiError.GetPostFail });

    const posts: IPost[] = []
    result.forEach((post: any) => {
      posts.push({
        id: post.id,
        userId: post.user_id,
        date: post.date,
        content: post.content,
        likeCount: post.like_count,
        liked: false,
        bookmarked: false,
      })
    });
    return res.send({ data: { posts } });
  }
}