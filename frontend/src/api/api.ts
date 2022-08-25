async function request(url: string, method: "GET" | "POST" | "PATCH" | "DELETE", data: any) {
  const options: RequestInit = { method }
  if (data) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data)
  }

  const res = await fetch(url, options);
  console.log(res.status);

  const json = await res.json();
  console.log(json);
  return json;
}

async function login(usertag: string, password: string) {
  console.log(await request("/api/auth/login", "POST", { usertag, password }));
}

export const api = {
  login
};