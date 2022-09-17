import { IPost, IUser } from "../../../shared/types";

async function request<TData>(url: string, data?: any): Promise<{ data: Partial<TData>, err: boolean }> {
  const options: RequestInit = { method: "POST" }
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data)
  }

  try {
    const res = await fetch(url, options);
    const out = { data: await res.json(), err: !res.ok };

    console.log(out);

    return out;
  } catch {
    return { data: {}, err: true }
  }
}

async function auth() {
  return await request<{ userId: number }>("/api/auth/auth");
}

async function login(usertag: string, password: string) {
  return await request<{ userId: number }>("/api/auth/login", { usertag, password });
}

async function signup(usertag: string, email: string, password: string) {
  return await request<{ userId: number }>("/api/auth/signup", {
    usertag, email, password
  });
}

async function logout() {
  return await request<{}>("/api/auth/logout");
}



async function followUser(userId: number) {
  return await request<{ state: boolean }>("/api/user/followUser", { userId });
}

async function getUserById(userId: number) {
  return await request<{ user: IUser }>("/api/user/getUserById", { userId });
}

async function getUserByTag(usertag: string) {
  return await request<{ user: IUser }>("/api/user/getUserByTag", { usertag });
}

async function getUserFollowers(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ users: IUser[] }>("/api/user/getUserFollowers", { userId, anchor, type });
}

async function getUserFollowings(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ users: IUser[] }>("/api/user/getUserFollowings", { userId, anchor, type });
}

async function editUser(username: string, bio: string) {
  return await request<{}>("/api/user/editUser", { username, bio });
}

async function searchUser(user: string) {
  return await request<{ users: IUser[] }>("/api/user/searchUser", { user });
}


async function getFeedPosts(anchor: number, type: "newer" | "older") {
  return await request<{ posts: IPost[] }>("/api/post/getFeedPosts", { anchor, type });
}

async function getUserPosts(userId: number, anchor: number, type: "newer" | "older") {
  return await request<{ posts: IPost[] }>("/api/post/getUserPosts", { userId, anchor, type });
}

async function getBookmarkedPosts(anchor: number, type: "newer" | "older") {
  return await request<{ posts: IPost[] }>("/api/post/getBookmarkedPosts", { anchor, type });
}

async function postPost(content: string) {
  return await request<{ post: IPost }>("/api/post/postPost", { content });
}

async function likePost(postId: number) {
  return await request<{ state: boolean }>("/api/post/likePost", { postId });
}

async function bookmarkPost(postId: number) {
  return await request<{ state: boolean }>("/api/post/bookmarkPost", { postId });
}

async function deletePost(postId: number) {
  return await request<{}>("/api/post/deletePost", { postId });
}

export default {
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
  searchUser,

  getFeedPosts,
  getUserPosts,
  getBookmarkedPosts,

  postPost,

  likePost,
  bookmarkPost,
  deletePost,
}