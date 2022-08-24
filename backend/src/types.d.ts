import { Request, Response } from "express";

export type ReqType = Request;
export type ResType = Response;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_PORT?: string;
      DB_NAME?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;

      PORT?: string;
    }
  }
}