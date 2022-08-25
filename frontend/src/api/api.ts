async function request<TData>(url: string, method: "GET" | "POST" | "PATCH" | "DELETE", data?: any): Promise<{ data: Partial<TData>, err: boolean }> {
  const options: RequestInit = { method }
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data)
  }

  const res = await fetch(url, options);
  const out = { data: await res.json(), err: !res.ok };

  console.log(out);

  return out;
}

async function auth() {
  return await request<{ userId: number }>("/api/auth/auth", "GET");
}

async function login(usertag: string, password: string) {
  return await request<{ userId: number }>("/api/auth/login", "POST", { usertag, password });
}

async function signup(usertag: string, email: string, password: string) {
  return await request<{ userId: number }>("/api/auth/signup", "POST", {
    usertag, email, password
  });
}

async function logout() {
  return await request<{}>("/api/auth/logout", "GET");
}

export const api = {
  auth,
  login,
  signup,
  logout,
};