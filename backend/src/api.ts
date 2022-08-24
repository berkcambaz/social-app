import { ApiCode, ApiError, ApiReqSchema } from "../../shared/types";
import { Signup } from "./api/signup";
import { Auth } from "./api/auth";
import { ReqType, ResType } from "./types";
import { Login } from "./api/login";
import { Post } from "./api/post";
import { User } from "./api/user";

export async function api(req: ReqType, res: ResType) {
  if (!req.body) return;

  console.log(req.body);
  const schema: ApiReqSchema<any> = req.body;

  switch (schema.type) {
    case ApiCode.Signup: await Signup.signup(req, res, schema.data); return;
    case ApiCode.Login: await Login.login(req, res, schema.data); return;
    default: break;
  }

  const userId = await Auth.auth(req, res, schema.data);
  if (userId === null) return res.send({ err: ApiError.AuthFail });
  if (schema.type === ApiCode.Auth) return res.send({ data: {} });

  switch (schema.type) {
    case ApiCode.PostPost: await Post.post(req, res, schema.data, userId); return;
    case ApiCode.GetPost: await Post.get(req, res, schema.data, userId); return;
    case ApiCode.GetUser: await User.get(req, res, schema.data, userId); return;
    default: break;
  }

  return res.status(404);
} 