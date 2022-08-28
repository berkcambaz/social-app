import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { db } from "../db";
import { compareBinary, fromBinary, randomBytes, sha256, toBinary, utcTimestamp } from "../utility";
import { validate } from "email-validator";

async function auth(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});
  return res.status(200).send({ userId });
}

async function login(req: Request, res: Response, next: NextFunction) {
  // If already logged in
  const userId = res.locals.userId;
  if (userId !== undefined) return res.status(404).send({});

  const data: Partial<{ usertag: string, password: string }> = req.body;

  // Check if data is undefined
  if (data.usertag === undefined || typeof data.usertag !== "string")
    return res.status(404).send({});
  if (data.password === undefined || typeof data.password !== "string")
    return res.status(404).send({});

  const usertag = data.usertag.trim();
  const password = data.password;

  // Usertag should be between 3 - 16 characters
  if (usertag.length < 3 || usertag.length > 16) return res.status(404).send({});

  // Check if password is not shorter than 8 characters
  if (password.length < 8) return res.status(404).send({});

  const { result, err } = await db.query(`SELECT id, password FROM user WHERE usertag=?`, [usertag]);

  // If an account with the corresponding email is not found
  if (result.length === 0 || err) return res.status(404).send({});

  // Sha256 hash the pure password and then base64 encode it. Password from the database  
  // is the bcrypt hashed password. Convert it to utf8 and check if they match.
  if (!(await bcrypt.compare(sha256(password).toString("base64"), fromBinary(result[0].password, "utf8"))))
    return res.status(404).send({});

  // Create an auth token for the newly signed up user
  const token = await createToken(result[0].id);
  if (token) setToken(res, token);
  else return res.status(404).send({});

  return res.status(200).send({ userId: result[0].id });
}

async function signup(req: Request, res: Response, next: NextFunction) {
  // If already logged in
  const userId = res.locals.userId;
  if (userId !== undefined) return res.status(404).send({});

  const data: Partial<{
    usertag: string,
    email: string,
    password: string
  }> = req.body;

  // Check if data is undefined
  if (data.usertag === undefined || typeof data.usertag !== "string") return res.status(404).send({});
  if (data.email === undefined || typeof data.email !== "string") return res.status(404).send({});
  if (data.password === undefined || typeof data.password !== "string") return res.status(404).send({});

  const usertag = data.usertag.trim();
  const username = usertag;
  const email = data.email;

  // Usertag should be between 3 - 16 characters
  if (usertag.length < 3 || usertag.length > 16) return res.status(404).send({});

  // Usertag should only contain a-z 0-9
  if (!/^[a-z0-9]*$/.test(usertag)) return res.status(404).send({});

  // Check if email is valid
  if (!validate(email)) return res.status(404).send({});

  // Check if password is not shorter than 8 characters
  if (data.password.length < 8) return res.status(404).send({});

  // Since bcrypt only accepts first 72 bytes and stops at the null bytes,hash the
  // password to get a fixed length of 32 bytes and base64 encode to avoid null bytes
  const password = await bcrypt.hash(sha256(data.password).toString("base64"), 10);

  // Timestamp that the user has signed up
  const date = utcTimestamp();

  const { result, err } = await db.query(`
     INSERT INTO user (username, usertag, email, password, date, follower_count, following_count, bio)
     VALUES (?, ?, ?, ?, ?, 0, 0, '')
   `, [username, usertag, email, password, date]);

  if (err) return res.status(404).send({});

  // Create an auth token for the newly signed up user
  const token = await createToken(result.insertId);
  if (token) setToken(res, token);
  else return res.status(404).send({});

  return res.status(200).send({ userId: result.insertId });
}

async function logout(req: Request, res: Response, next: NextFunction) {
  // Get userId
  const userId = res.locals.userId;
  if (userId === undefined) return res.status(404).send({});

  // Get tokenId
  const tokenId = res.locals.tokenId;
  if (tokenId === undefined) return res.status(404).send({});

  deleteToken(res, userId, tokenId);
  return res.status(200).send({});
}

function getToken(req: Request): string | null {
  return req.cookies["token"] === undefined ? null : req.cookies["token"];
}

function setToken(res: Response, token: { token: string, expires: number }) {
  res.cookie("token", token.token,
    { secure: true, httpOnly: true, sameSite: true, expires: new Date(token.expires * 1000) }
  );
}

async function deleteToken(res: Response, userId: number, tokenId: number): Promise<void> {
  res.clearCookie("token");

  await db.query(`DELETE FROM auth WHERE id=? AND user_id=?`, [tokenId, userId]);
}

async function createToken(userId: number): Promise<{ token: string, expires: number } | null> {
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
  return {
    token: fromBinary(selector, "base64url") + ":" + fromBinary(validator, "base64url"),
    expires: expires
  };
}

async function parseToken(res: Response, token: string | null): Promise<{ userId: number, tokenId: number } | null> {
  if (token === null) return null;

  // Split the token by ":" since the format of the auth token is selector:validator which is a base64url
  const splitToken = token.split(":");
  const selector = toBinary(splitToken[0], "base64url");
  const validator = toBinary(splitToken[1], "base64url");

  // Query using the selector to avoid timing attacks
  const { result, err } = await db.query(`
    SELECT id, user_id, validator, expires FROM auth WHERE selector=?
  `, [selector]);

  // If no result or there is an error
  if (result.length === 0 || err) return null;

  // Validator from the base64url is unhashed, so hash it and compare with the one from the query
  if (!compareBinary(sha256(validator), result[0].validator)) return null;

  // Check if the token is expired
  if (utcTimestamp() > result[0].expires) {
    deleteToken(res, result[0].user_id, result[0].id);
    return null;
  }

  return { userId: result[0].user_id, tokenId: result[0].id };
}

export default { auth, login, signup, logout, getToken, parseToken };