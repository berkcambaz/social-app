import { ApiCode, ApiError, ApiReqSchema } from "../../shared/types";
import { Signup } from "./api/signup";
import { Auth } from "./api/token";
import { ReqType, ResType } from "./types";

export async function api(req: ReqType, res: ResType) {
  if (!req.body) return;

  console.log(req.body);
  const schema: ApiReqSchema<any> = req.body;

  switch (schema.type) {
    case ApiCode.Signup: await Signup.signup(req, res, schema.data); return;
    case ApiCode.Login: return;
    default: break;
  }

  const userId = await Auth.auth(req, res, schema.data);
  if (userId === null) return res.send({ err: ApiError.AuthFail });
  if (schema.type === ApiCode.Auth) return res.send({ data: {} });

  switch (schema.type) {
    default: break;
  }
} 