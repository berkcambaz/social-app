import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { IPost } from '../../../../shared/types';
import { postApi } from '../apis/postApi';
import { RootState } from '../store';

const postsAdapter = createEntityAdapter<IPost & { isFeedPost: boolean }>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => (b.id - a.id),
})

export interface PostState {
  posts: EntityState<IPost & { isFeedPost: boolean }>;
}

const initialState: PostState = {
  posts: postsAdapter.getInitialState(),
}

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(postApi.endpoints.likePost.matchFulfilled,
        (state, action) => {
          const postId = action.meta.arg.originalArgs.postId;
          const liked = action.payload.state as boolean;
          const likeCount = state.posts.entities[postId]!.likeCount + (liked ? +1 : -1)
          postsAdapter.updateOne(state.posts, { id: postId, changes: { liked, likeCount } });
        })
      .addMatcher(postApi.endpoints.bookmarkPost.matchFulfilled,
        (state, action) => {
          const postId = action.meta.arg.originalArgs.postId;
          const bookmarked = action.payload.state as boolean;
          postsAdapter.updateOne(state.posts, { id: postId, changes: { bookmarked } });
        })
      .addMatcher(postApi.endpoints.postPost.matchFulfilled,
        (state, { payload }: { payload: { post: IPost } }) => {
          const post: IPost & { isFeedPost: boolean } = { ...payload.post, isFeedPost: true }
          postsAdapter.setOne(state.posts, post);
        })
      .addMatcher(postApi.endpoints.getFeedPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          let posts: (IPost & { isFeedPost: boolean })[] = [];
          for (let i = 0; i < payload.posts.length; ++i)
            posts[i] = { ...payload.posts[i], isFeedPost: true }
          postsAdapter.setMany(state.posts, posts);
        })
      .addMatcher(postApi.endpoints.getUserPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          let posts: (IPost & { isFeedPost: boolean })[] = [];
          for (let i = 0; i < payload.posts.length; ++i)
            posts[i] = { ...payload.posts[i], isFeedPost: true }
          postsAdapter.setMany(state.posts, posts);
        })
      .addMatcher(postApi.endpoints.getBookmarkedPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          let posts: (IPost & { isFeedPost: boolean })[] = [];
          for (let i = 0; i < payload.posts.length; ++i)
            posts[i] = { ...payload.posts[i], isFeedPost: isFeedPost(state, payload.posts[i]) }
          postsAdapter.setMany(state.posts, posts);
        })
  },
})

function isFeedPost(state: ReturnType<typeof postSlice.getInitialState>, post: IPost) {
  return !!state.posts.entities[post.id]?.isFeedPost
}

export const { } = postSlice.actions
export default postSlice.reducer

export const {
  selectAll: selectAllPosts
} = postsAdapter.getSelectors((state: RootState) => state.post.posts)