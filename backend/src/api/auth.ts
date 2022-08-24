import { ApiCode, ApiError, ApiReq } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";
import { compareBinary, fromBinary, randomBytes, sha256, toBinary, utcTimestamp } from "../utility";

export class Auth {
  public static async auth(req: ReqType, res: ResType, data: ApiReq[ApiCode.Auth]): Promise<number | null> {
    const token = this.getToken(req);
    if (!token) return null;

    // Split the token by ":" since the format of the auth token is selector:validator which is a base64url
    const splitToken = token.split(":");
    const selector = toBinary(splitToken[0], "base64url");
    const validator = toBinary(splitToken[1], "base64url");

    // Query using the selector to avoid timing attacks
    const { result, err } = await db.query(`
      SELECT user_id, validator, expires FROM auth WHERE selector=?
    `, [selector]);

    // If no result or there is an error
    if (result.length === 0 || err) return null;

    // Check if the token is expired
    if (utcTimestamp() > result[0].expires) return null;

    // Validator from the base64url is unhashed, so hash it and compare with the one from the query
    if (!compareBinary(sha256(validator), result[0].validator)) return null;

    return result[0].user_id;
  }

  public static async createAuthToken(userId: number): Promise<string | null> {
    // Create selector (16 bytes) and validator (32 bytes)
    const selector = randomBytes(16);
    const validator = randomBytes(32);

    // Hash the validator (only used for storing in the database)
    const validatorHash = sha256(validator);

    // Set the expiration date to 1 month from now
    const expires = utcTimestamp() + 60 * 60 * 24 * 30;

    const { result, err } = await db.query(`
      INSERT INTO auth (user_id, selector, validator, expires)
      VALUES (?, ?, ?, ?)
    `, [userId, selector, validatorHash, expires]);

    if (err) return null;

    // Convert token to it's final form by base64url-ing both selector & validator
    return fromBinary(selector, "base64url") + ":" + fromBinary(validator, "base64url");
  }

  public static getToken(req: ReqType): string | null {
    return req.cookies["token"];
  }

  public static setToken(res: ResType, token: string) {
    // TODO: Add expiry date
    res.cookie("token", token, { secure: true, httpOnly: true, sameSite: true });
  }

  public static clearToken(res: ResType) {
    res.clearCookie("token");
  }
}