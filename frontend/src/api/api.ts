import type { ApiCode, ApiReq, ApiRes } from "../../../shared/types";

export async function api<T extends ApiCode>(type: T, req: ApiReq[T]): Promise<ApiRes[T]> {
  const res = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data: req })
  })

  const json = await res.json();
  console.log(json);
  return json;
}