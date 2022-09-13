import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { useMemo } from 'react';
import { IPost, IUser } from '../../../../shared/types';
import { postApi } from '../apis/postApi';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const postsAdapter = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => (b.id - a.id),
})

export interface PostState {
  posts: EntityState<IPost>;
  feedPosts: { [key: number]: boolean };
}

const initialState: PostState = {
  posts: postsAdapter.getInitialState(),
  feedPosts: {},
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
          state.feedPosts[payload.post.id] = true;
          postsAdapter.setOne(state.posts, payload.post);
        })
      .addMatcher(postApi.endpoints.getFeedPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          payload.posts.forEach(post => state.feedPosts[post.id] = true);
          postsAdapter.setMany(state.posts, payload.posts);
        })
      .addMatcher(postApi.endpoints.getUserPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          postsAdapter.setMany(state.posts, payload.posts);
        })
      .addMatcher(postApi.endpoints.getBookmarkedPosts.matchFulfilled,
        (state, { payload }: { payload: { posts: IPost[] } }) => {
          postsAdapter.setMany(state.posts, payload.posts);
        })
  },
})

export const { } = postSlice.actions
export default postSlice.reducer

export const {
  selectAll: selectAllPosts
} = postsAdapter.getSelectors((state: RootState) => state.post.posts)

export const useFeedPosts = () => {
  const allPosts = useAppSelector(selectAllPosts);
  const feedPosts = useAppSelector(state => state.post.feedPosts);

  const posts = useMemo(() => {
    const posts: IPost[] = [];

    for (let i = 0; i < allPosts.length; ++i)
      if (feedPosts[allPosts[i].id])
        posts.push(allPosts[i]);

    return posts;
  }, [allPosts])

  return posts;
}

export const useUserPosts = (user: IUser | undefined) => {
  const allPosts = useAppSelector(selectAllPosts);

  const posts = useMemo(() => {
    if (!user) return [];

    const posts: IPost[] = [];

    for (let i = 0; i < allPosts.length; ++i)
      if (allPosts[i].userId === user.id)
        posts.push(allPosts[i]);

    return posts;
  }, [allPosts, user])

  return posts;
}