import { ApiCode, ApiError, ApiReq, IUser } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";

export class User {
  public static async getByIds(req: ReqType, res: ResType, data: ApiReq[ApiCode.GetUsersById], userId: number) {
    if (data.userIds.length > 25) return res.send({ err: ApiError.GetUserFail });
    if (data.userIds.length === 0) return res.send({ err: ApiError.GetUserFail });

    const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
      WHERE id IN (?)
    `, data.userIds);

    if (err) return res.send({ err: ApiError.GetUserFail });

    const users = this.normalizeUsers(result);
    if (!users) return res.send({ err: ApiError.GetUserFail });

    return res.send({ data: { users } })
  }

  public static async getByTag(req: ReqType, res: ResType, data: ApiReq[ApiCode.GetUserByTag], userId: number) {
    const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user WHERE usertag=?
    `, [data.usertag]);

    if (err) return res.send({ err: ApiError.GetUserFail });

    const user = this.normalizeUsers(result)[0];
    if (!user) return res.send({ err: ApiError.GetUserFail });

    return res.send({ data: { user } })
  }

  private static normalizeUsers(users: any) {
    const normalized: IUser[] = [];
    for (let i = 0; i < users.length; ++i) {
      normalized.push({
        id: users[i].id,
        name: users[i].username,
        tag: users[i].usertag,
        date: users[i].date,
        bio: users[i].bio,
        followerCount: users[i].follower_count,
        followingCount: users[i].following_count
      })
    }
    return normalized;
  }
}