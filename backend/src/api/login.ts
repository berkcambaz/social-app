import { ApiCode, ApiError, ApiReq } from "../../../shared/types";
import { db } from "../db";
import { ReqType, ResType } from "../types";

import * as bcrypt from "bcrypt";
import { fromBinary, sha256 } from "../utility";
import { Auth } from "./auth";

export class Login {
  public static async login(req: ReqType, res: ResType, data: ApiReq[ApiCode.Login]) {
    // Usertag should be between 3 - 16 characters
    if (data.usertag.length < 3 || data.usertag.length > 16) return res.send({ err: ApiError.LoginFail });

    // Check if password is not shorter than 8 characters
    if (data.password.length < 8) return res.send({ err: ApiError.LoginFail });


    const usertag = data.usertag;
    const password = data.password;

    const { result, err } = await db.query(`SELECT id, password FROM user WHERE usertag=?`, [usertag]);

    // If an account with the corresponding email is not found
    if (result.length === 0 || err) return res.send({ err: ApiError.LoginFail });

    // Sha256 hash the pure password and then base64 encode it. Password from the database  
    // is the bcrypt hashed password. Convert it to utf8 and check if they match.
    if (!(await bcrypt.compare(sha256(password).toString("base64"), fromBinary(result[0].password, "utf8")))) return res.send({ err: ApiError.LoginFail });

    // Create an auth token for the newly signed up user
    const token = await Auth.createAuthToken(result[0].id);
    if (token) Auth.setToken(res, token);
    return res.send({ data: { userId: result[0].id } });
  }
}