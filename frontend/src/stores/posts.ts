import { api } from "@/api/api";
import { defineStore } from "pinia";
import type { IPost, IUser } from "../../../shared/types";

interface State {
  feedPosts: { [key: number]: IPost },
  feedPostIds: number[],

  userPosts: { [key: number]: IPost },
  userPostIds: number[],

  bookmarkedPosts: { [key: number]: IPost },
  bookmarkedPostIds: number[],

  posts: { [key: number]: IPost },
  postComments: { [key: number]: number[] },
}

export const usePosts = defineStore("posts", {
  state: (): State => ({
    feedPosts: {},
    feedPostIds: [],

    userPosts: {},
    userPostIds: [],

    bookmarkedPosts: {},
    bookmarkedPostIds: [],

    posts: {},
    postComments: {},
  }),
  getters: {
    getFeedPosts: (state) => {
      const posts: IPost[] = [];
      state.feedPostIds.forEach(id => { posts.push(state.feedPosts[id]) })
      return posts;
    },
    getUserPosts: (state) => {
      return (user: IUser) => {
        const posts: IPost[] = [];
        for (let i = 0; i < state.userPostIds.length; ++i) {
          if (state.userPosts[state.userPostIds[i]].userId === user.id)
            posts.push(state.userPosts[state.userPostIds[i]]);
        }
        return posts;
      }
    },
    getBookmarkedPosts: (state) => {
      const posts: IPost[] = [];
      state.bookmarkedPostIds.forEach(id => { posts.push(state.bookmarkedPosts[id]) })
      return posts;
    },
    getPost: (state) => {
      return (postId: number) => state.posts[postId] ? state.posts[postId] : null;
    },
    getPostComments: (state) => {
      return (post: IPost) => {
        if (!state.postComments[post.id]) return null;
        const posts: IPost[] = [];
        for (let i = 0; i < state.postComments[post.id].length; ++i)
          posts.push(state.posts[state.postComments[post.id][i]]);
        return posts;
      }
    }
  },
  actions: {
    async post(content: string) {
      const { data, err } = await api.postPost(content);
      if (data.post === undefined || err) return;

      const post = data.post;
      this.feedPosts[post.id] = post;
      this.feedPostIds.push(post.id);
      this.sortFeedPosts();
    },
    async postComment(postId: number, content: string) {
      const { data, err } = await api.postPostComment(postId, content);
      if (err || data.post === undefined) return;

      const post = data.post;
      if (!this.postComments[postId]) this.postComments[postId] = [];
      this.postComments[postId].push(post.id);
      this.posts[post.id] = post;
      this.posts[postId].commentCount += 1;
      this.sortCommentPosts(postId);
    },
    async like(post: IPost) {
      const { data, err } = await api.likePost(post.id);
      if (data.state === undefined || err) return;

      post.liked = data.state;
      post.likeCount += data.state ? +1 : -1;
    },
    async bookmark(post: IPost) {
      const { data, err } = await api.bookmarkPost(post.id);
      if (data.state === undefined || err) return;

      post.bookmarked = data.state;
      if (data.state) return;
      if (!this.bookmarkedPosts[post.id]) return;
      const index = this.bookmarkedPostIds.findIndex((id) => id === post.id);
      if (index !== undefined) {
        this.bookmarkedPostIds.splice(index, 1);
        delete this.bookmarkedPosts[post.id];
      }
    },
    async delete(post: IPost) {
      const { data, err } = await api.deletePost(post.id);
      if (err) return;

      const feedPostId = this.feedPostIds.findIndex((id) => id === post.id);
      delete this.feedPosts[post.id];
      if (feedPostId !== -1) this.feedPostIds.splice(feedPostId, 1);

      const userPostId = this.feedPostIds.findIndex((id) => id === post.id);
      delete this.userPosts[post.id];
      if (userPostId !== -1) this.feedPostIds.splice(userPostId, 1);
      
      if (this.postComments[post.commentId]) {
        this.posts[post.commentId].commentCount += -1;
        const commentPostId = this.postComments[post.commentId].findIndex((id) => id === post.id);
        if (commentPostId !== -1) this.postComments[post.commentId].splice(commentPostId, 1);
        delete this.posts[post.id];
      }
    },
    async fetchFeedPosts(type: "newer" | "older", refresh?: boolean) {
      const anchor = this.feedPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.feedPostIds[0] :
          this.feedPostIds[this.feedPostIds.length - 1];

      const { data, err } = await api.getFeedPosts(anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.feedPosts[post.id] = post;
        this.feedPostIds.push(post.id);
      })
      this.sortFeedPosts();
    },
    async fetchUserPosts(userId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = this.userPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.userPostIds[0] :
          this.userPostIds[this.userPostIds.length - 1];

      const { data, err } = await api.getUserPosts(userId, anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.userPosts[post.id] = post;
        this.userPostIds.push(post.id);
      })
      this.sortUserPosts();
    },
    async fetchBookmarkedPosts(type: "newer" | "older", refresh?: boolean) {
      const anchor = this.bookmarkedPostIds.length === 0 || refresh ? -1 :
        type === "newer" ?
          this.bookmarkedPostIds[0] :
          this.bookmarkedPostIds[this.bookmarkedPostIds.length - 1];

      const { data, err } = await api.getBookmarkedPosts(anchor, type);
      if (data.posts === undefined || data.posts.length === 0 || err) return;

      const posts = data.posts;
      posts.forEach(post => {
        this.bookmarkedPosts[post.id] = post;
        this.bookmarkedPostIds.push(post.id);
      })
      this.sortBookmarkedPosts();
    },
    async fetchPost(postId: number) {
      const { data, err } = await api.getPost(postId);
      if (err || data.post === undefined) return;

      const post = data.post;
      this.posts[post.id] = post;
    },
    async fetchPostComments(postId: number, type: "newer" | "older", refresh?: boolean) {
      const anchor = !this.postComments[postId] || this.postComments[postId].length === 0 || refresh ? -1 :
        type === "newer" ?
          this.postComments[postId][0] :
          this.postComments[postId][this.postComments[postId].length - 1];

      const { data, err } = await api.getPostComments(postId, anchor, type);
      if (err || data.posts === undefined || data.posts.length === 0) return;

      const posts = data.posts;
      if (!this.postComments[postId] || refresh) this.postComments[postId] = [];

      posts.forEach((post) => {
        if (!this.posts[post.id]) this.postComments[postId].push(post.id);
        this.posts[post.id] = post;
      })
      this.sortCommentPosts(postId);
    },
    sortFeedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.feedPostIds = [... new Set(this.feedPostIds)];
      this.feedPostIds.sort((a, b) => (b - a));
    },
    sortUserPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.userPostIds = [... new Set(this.userPostIds)];
      this.userPostIds.sort((a, b) => (b - a));
    },
    sortBookmarkedPosts() {
      // Convert array -> set -> array in order to remove duplicates
      this.bookmarkedPostIds = [... new Set(this.bookmarkedPostIds)];
      this.bookmarkedPostIds.sort((a, b) => (b - a));
    },
    sortCommentPosts(postId: number) {
      // Convert array -> set -> array in order to remove duplicates
      this.postComments[postId] = [... new Set(this.postComments[postId])];
      this.postComments[postId].sort((a, b) => (b - a));
    }
  }
})