export interface IUser {
  id: number;
  name: string;
  tag: string;
  bio: string;
  date: number;
  followingCount: number;
  followerCount: number;
}

export interface IPost {
  id: number;
  userId: number;
  date: number;
  content: string;
  likeCount: number;
  liked: boolean;
  bookmarked: boolean;
}

export enum ApiCode {
  Auth = "auth",

  Login = "login",
  Signup = "signup",
  Logout = "logout",

  PostPost = "post_post",
  GetPost = "get_post",
  LikePost = "like_post",
  BookmarkPost = "bookmark_post",

  GetUser = "get_user",
  SetUser = "set_user",
}

export enum ApiError {
  AuthFail = "auth_fail",

  LoginFail = "login_fail",
  SignupFail = "signup_fail",

  PostPostFail = "post_post_fail",
  GetPostFail = "get_post_fail",
  LikePostFail = "like_post_fail",
  BookmarkPostFail = "bookmark_post_fail",

  GetUserFail = "get_user_fail",
  SetUserFail = "set_user_fail",
}

export interface ApiReqSchema<T> {
  type: ApiCode;
  data?: T;
}

export interface ApiResSchema<T> {
  data?: T;
  err?: ApiError;
}

export interface ApiReq {
  [ApiCode.Auth]: {};
  [ApiCode.Login]: {
    usertag: string;
    password: string;
  };
  [ApiCode.Signup]: {
    usertag: string;
    email: string;
    password: string;
  };
  [ApiCode.Logout]: {};

  [ApiCode.PostPost]: {
    content: string;
  };
  [ApiCode.GetPost]: {
    anchor: number,
    type: "newer" | "older"
  };
  [ApiCode.LikePost]: { postId: number };
  [ApiCode.BookmarkPost]: { postId: number };

  [ApiCode.GetUser]: {
    userId: number[]
  };
  [ApiCode.SetUser]: {};
}

export interface ApiRes {
  [ApiCode.Auth]: ApiResSchema<{}>
  [ApiCode.Login]: ApiResSchema<{}>
  [ApiCode.Signup]: ApiResSchema<{}>
  [ApiCode.Logout]: ApiResSchema<{}>

  [ApiCode.GetPost]: ApiResSchema<{ posts: IPost[] }>
  [ApiCode.PostPost]: ApiResSchema<{ post: IPost }>
  [ApiCode.LikePost]: ApiResSchema<{ state: boolean }>
  [ApiCode.BookmarkPost]: ApiResSchema<{ state: boolean }>

  [ApiCode.GetUser]: ApiResSchema<{ users: IUser[] }>
  [ApiCode.SetUser]: ApiResSchema<{}>
}