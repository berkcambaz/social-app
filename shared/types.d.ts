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

  /**
   * Points to the main post.
   */
  commentId: number;  

  /**
   * Points to the main comment.
   */
  replyId: number;
  
  content: string;

  liked: boolean;
  bookmarked: boolean;
  
  likeCount: number;
  commentCount: number;
}