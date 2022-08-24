import { ApiCode, ApiError, ApiReq, IUser } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";

export class User {
  public static async get(req: ReqType, res: ResType, data: ApiReq[ApiCode.GetUser], userId: number) {
    if (data.userIds.length > 25) return res.send({ err: ApiError.GetUserFail });
    if (data.userIds.length === 0) return res.send({ err: ApiError.GetUserFail });

    const { result, err } = await db.query(`
      SELECT id, username, usertag, date, bio, following_count, follower_count FROM user
      WHERE id IN (?)
    `, [...data.userIds]);

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
}