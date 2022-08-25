import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { db } from "../db";
import { compareBinary, fromBinary, randomBytes, sha256, toBinary, utcTimestamp } from "../utility";
import { validate } from "email-validator";

async function auth(req: Request, res: Response, next: NextFunction): Promise<number | null> {
  const token = getToken(req);
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

async function login(req: Request, res: Response, next: NextFunction) {
  // If already logged in
  const userId = res.locals.userId;
  if (userId != undefined) return res.status(404).send();

  const data: Partial<{ usertag: string, password: string }> = req.body;

  // Check if data is undefined
  if (data.usertag === undefined) return res.status(404).send();
  if (data.password === undefined) return res.status(404).send();

  // Usertag should be between 3 - 16 characters
  if (data.usertag.length < 3 || data.usertag.length > 16) return res.status(404).send();

  // Check if password is not shorter than 8 characters
  if (data.password.length < 8) return res.status(404).send();

  const usertag = data.usertag;
  const password = data.password;

  const { result, err } = await db.query(`SELECT id, password FROM user WHERE usertag=?`, [usertag]);

  // If an account with the corresponding email is not found
  if (result.length === 0 || err) return res.status(404).send();

  // Sha256 hash the pure password and then base64 encode it. Password from the database  
  // is the bcrypt hashed password. Convert it to utf8 and check if they match.
  if (!(await bcrypt.compare(sha256(password).toString("base64"), fromBinary(result[0].password, "utf8"))))
    return res.status(404).send();

  // Create an auth token for the newly signed up user
  const token = await createToken(result[0].id);
  if (token) setToken(res, token);
  return res.status(200).send();
}

async function signup(req: Request, res: Response, next: NextFunction) {
  // If already logged in
  const userId = res.locals.userId;
  if (userId != undefined) return res.status(404).send();

  const data: Partial<{ usertag: string, email: string, password: string }> = req.body;

  // Check if data is undefined
  if (data.usertag === undefined) return res.status(404).send();
  if (data.email === undefined) return res.status(404).send();
  if (data.password === undefined) return res.status(404).send();

  // Usertag should be between 3 - 16 characters
  if (data.usertag.length < 3 || data.usertag.length > 16) return res.status(404).send();

  // Check if email is valid
  if (!validate(data.email)) return res.status(404).send();

  // Check if password is not shorter than 8 characters
  if (data.password.length < 8) return res.status(404).send();

  const usertag = data.usertag;
  const username = usertag;
  const email = data.email;

  // Since bcrypt only accepts first 72 bytes and stops at the null bytes,hash the
  // password to get a fixed length of 32 bytes and base64 encode to avoid null bytes
  const password = await bcrypt.hash(sha256(data.password).toString("base64"), 10);

  // Timestamp that the user has signed up
  const date = utcTimestamp();

  const { result, err } = await db.query(`
     INSERT INTO user (username, usertag, email, password, date, follower_count, following_count)
     VALUES (?, ?, ?, ?, ?, 0, 0)
   `, [username, usertag, email, password, date]);

  if (err) return auth

  // Create an auth token for the newly signed up user
  const token = await createToken(result.insertId);
  if (token) setToken(res, token);
  return res.status(200).send();
}

async function logout(req: Request, res: Response, next: NextFunction) {
  // If not logged in
  const userId = res.locals.userId;
  if (userId == undefined) return res.status(404).send();

  // TODO: Implement in a better way
  clearToken(res);
  return res.status(200).send();
}

function getToken(req: Request): string | null {
  return req.cookies["token"];
}

function setToken(res: Response, token: string) {
  // TODO: Add expiry date
  res.cookie("token", token, { secure: true, httpOnly: true, sameSite: true });
}

function clearToken(res: Response) {
  res.clearCookie("token");
}

async function createToken(userId: number): Promise<string | null> {
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

export default { auth, login, signup, logout };