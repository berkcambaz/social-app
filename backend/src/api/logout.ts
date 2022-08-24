import { ApiCode, ApiReq } from "../../../shared/types";
import { ReqType, ResType } from "../types";
import { Auth } from "./auth";

export class Logout {
  public static async logout(req: ReqType, res: ResType, data: ApiReq[ApiCode.Logout], userId: number) {
    // TODO: Implement in a better way
    Auth.clearToken(res);
    res.send({ data: {} });
  }
}