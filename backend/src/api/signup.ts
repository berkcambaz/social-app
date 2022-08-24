import { validate } from "email-validator";
import { ApiCode, ApiError, ApiReq, ApiRes } from "../../../shared/types";
import { ReqType, ResType } from "../types";

import * as bcrypt from "bcrypt";
import { sha256, utcTimestamp } from "../utility";
import { db } from "../db";
import { Auth } from "./token";

export class Signup {
  public static async signup(req: ReqType, res: ResType, data: ApiReq[ApiCode.Signup]) {
    // Usertag should be between 3 - 16 characters
    if (data.usertag.length < 3 || data.usertag.length > 16) return res.send({ err: ApiError.SignupFail });

    // Check if email is valid
    if (!validate(data.email)) return res.send({ err: ApiError.SignupFail });

    // Check if password is not shorter than 8 characters
    if (data.password.length < 8) return res.send({ err: ApiError.SignupFail });

    const usertag = data.usertag;
    const username = usertag;
    const email = data.email;

    // Since bcrypt only accepts first 72 bytes and stops at the null bytes,hash the
    // password to get a fixed length of 32 bytes and base64 encode to avoid null bytes
    const password = await bcrypt.hash(sha256(data.password).toString("base64"), 10);

    // Timestamp that the user has signed up
    const date = utcTimestamp();

    const { result, err } = await db.query(`
      INSERT INTO user (username, usertag, email, password, date)
      VALUES (?, ?, ?, ?, ?)
    `, [username, usertag, email, password, date]);

    if (err) return res.send({ err: ApiError.SignupFail });

    // Create an auth token for the newly signed up user
    const token = Auth.createAuthToken(result.insertId);
    if (!token) Auth.setToken(res, token);
    return res.send({ data: {} });
  }
}