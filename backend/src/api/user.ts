import { ApiCode, ApiError, ApiReq, IUser } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";

export class User {
  public static async get(req: ReqType, res: ResType, data: ApiReq[ApiCode.GetUser], userId: number) {
    if (data.userIds) return this.getByIds(req, res, data.userIds, userId);
    if (data.usertag) return this.getByTag(req, res, data.usertag, userId);
    return res.send({ err: ApiError.GetUserFail });
  }

  public static async getByIds(req: ReqType, res: ResType, userIds: number[], userId: number) {
    if (userIds.length > 25) return res.send({ err: ApiError.GetUserFail });
    if (userIds.length === 0) return res.send({ err: ApiError.GetUserFail });

    const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
      WHERE id IN (?)
    `, [...userIds]);

    if (err) return res.send({ err: ApiError.GetUserFail });

    const users: IUser[] = [];
    for (let i = 0; i < result.length; ++i) {
      users.push({
        id: result[i].id,
        name: result[i].username,
        tag: result[i].usertag,
        date: result[i].date,
        bio: result[i].bio,
        followerCount: result[i].follower_count,
        followingCount: result[i].following_count
      })
    }

    return res.send({ data: { users: users } })
  }

  public static async getByTag(req: ReqType, res: ResType, usertag: string, userId: number) {
    const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE usertag=?
    `, [usertag]);

    if (err) return res.send({ err: ApiError.GetUserFail });

    const users = [];
    for (let i = 0; i < result.length; ++i) {
      users.push({
        id: result[i].id,
        name: result[i].username,
        tag: result[i].usertag,
        date: result[i].date,
        bio: result[i].bio,
        followerCount: result[i].follower_count,
        followingCount: result[i].following_count
      })
    }

    return res.send({ data: { users: users } })
  }
}