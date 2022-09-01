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
  commentId: number;
  date: number;
  content: string;
  commentCount: number;
  likeCount: number;
  liked: boolean;
  bookmarked: boolean;
}