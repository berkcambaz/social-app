import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { IPost } from '../../../../shared/types';
import { postApi } from '../apis/postApi';
import { RootState } from '../store';

const feedPostsAdapter = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => (b.id - a.id)
})

export interface PostState {
  feedPosts: EntityState<IPost>;
}

const initialState: PostState = {
  feedPosts: feedPostsAdapter.getInitialState()
}

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addMatcher(postApi.endpoints.likePost.matchFulfilled,
        (state, action) => {
          const postId = action.meta.arg.originalArgs.postId;
          const likeState = action.payload.state as boolean;
          feedPostsAdapter.updateOne(state.feedPosts, { id: postId, changes: { liked: likeState } });
        })
      .addMatcher(postApi.endpoints.bookmarkPost.matchFulfilled,
        (state, action) => {
          const postId = action.meta.arg.originalArgs.postId;
          const bookmarkState = action.payload.state as boolean;
          feedPostsAdapter.updateOne(state.feedPosts, { id: postId, changes: { bookmarked: bookmarkState } });
        })
      .addMatcher(postApi.endpoints.postPost.matchFulfilled,
        (state, { payload }: { payload: { post: IPost } }) => {
          feedPostsAdapter.setOne(state.feedPosts, payload.post);
        })
      .addMatcher(postApi.endpoints.getFeedPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          feedPostsAdapter.setMany(state.feedPosts, payload.posts);
        })
  },
})

export const { } = postSlice.actions
export default postSlice.reducer

export const {
  selectAll: allFeedPosts
} = feedPostsAdapter.getSelectors((state: RootState) => state.post.feedPosts)