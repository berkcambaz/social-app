import type { IPost, IUser } from "../../../shared/types";

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
  return await request<{ userId: number }>("/api/auth/auth", "POST");
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
  return await request<{}>("/api/auth/logout", "POST");
}



async function followUser(userId: number) {
  return await request<{ state: boolean }>("/api/user/followUser", "POST", { userId });
}

async function getUserById(userId: number) {
  return await request<{ user: IUser }>("/api/user/getUserById", "POST", { userId });
}

async function getUserByTag(usertag: string) {
  return await request<{ user: IUser }>("/api/user/getUserByTag", "POST", { usertag });
}

async function getUserFollowers(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ users: IUser[] }>("/api/user/getUserFollowers", "POST", { userId, anchor, type });
}

async function getUserFollowings(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ users: IUser[] }>("/api/user/getUserFollowings", "POST", { userId, anchor, type });
}

async function editUser(username: string, bio: string) {
  return await request<{}>("/api/user/editUser", "POST", { username, bio });
}


async function getFeedPosts(anchor: number, type: "newer" | "older") {
  return await request<{ posts: IPost[] }>("/api/post/getFeedPosts", "POST", { anchor, type });
}

async function getUserPosts(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ posts: IPost[] }>("/api/post/getUserPosts", "POST", { userId, anchor, type });
}

async function postPost(content: string) {
  return await request<{ post: IPost }>("/api/post/postPost", "POST", { content });
}

async function likePost(postId: number) {
  return await request<{ state: boolean }>("/api/post/likePost", "POST", { postId });
}

async function bookmarkPost(postId: number) {
  return await request<{ state: boolean }>("/api/post/bookmarkPost", "POST", { postId });
}

async function deletePost(postId: number) {
  return await request<{}>("/api/post/deletePost", "POST", { postId });
}



export const api = {
  auth,
  login,
  signup,
  logout,

  followUser,

  getUserById,
  getUserByTag,
  getUserFollowers,
  getUserFollowings,
  editUser,

  getFeedPosts,
  getUserPosts,

  postPost,

  likePost,
  bookmarkPost,
  deletePost,
};