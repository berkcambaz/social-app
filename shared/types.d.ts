export interface IUser {
  id: number;
  name: string;
  tag: string;
  bio: string;
  date: number;
  followingCount: number;
  followerCount: number;
  following: boolean;
  follower: boolean;
}

export interface IPost {
  id: number;
  userId: number;
  date: number;
  content: string;
  commentCount: number;
  likeCount: number;
  liked: boolean;
  bookmarked: boolean;
}

export interface IComment {
  id: number;
  userId: number;
  postId: number;
  date: number;
  content: string;
  liked: boolean;
  likeCount: number;
  replyCount: number;
}

export interface IReply {
  id: number;
  userId: number;
  commentId: number;
  date: number;
  content: string;
  liked: boolean;
  likeCount: number;
}