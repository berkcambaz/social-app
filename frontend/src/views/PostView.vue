<script setup lang="ts">
import router from '@/router';
import Post from '../components/Post.vue';
import LoaderContainer from '../components/LoaderContainer.vue';
import { ref } from 'vue';
import type { IPost } from '../../../shared/types';
import { usePosts } from '@/stores/posts';
import PostCreate from '../components/PostCreate.vue';
import { i18n } from '@/util/i18n';

const posts = usePosts();
const { t } = i18n.global;
const postId = parseInt(router.currentRoute.value.params["id"] as string);
let mainPostLoading = ref(true);

const onInit = async () => {
  await posts.fetchPost(postId);
  const post = posts.getPost(postId);
  mainPostLoading.value = false;
  if (post === null) return;

  let commentId = post.commentId;
  for (; commentId !== -1;) {
    if (posts.getPost(commentId) === null) await posts.fetchPost(commentId);
    const post = posts.getPost(commentId)
    if (post === null) break;
    commentId = post.commentId;
  }

  await posts.fetchPostComments(post.id, "newer", true);
}

const onTop = async () => {
  await posts.fetchPostComments(postId, "newer")
}

const onBottom = async () => {
   await posts.fetchPostComments(postId, "older")
}
</script>

<template>
  <div class="post-wrapper">
    <Post v-if="posts.getPost(postId)" v-for="post in posts.getConnectedPosts(postId)" :post="post" />
    <Post v-if="posts.getPost(postId)" :post="(posts.getPost(postId) as IPost)" class="main-post" />
  </div>
  <div v-if="!posts.getPost(postId) && !mainPostLoading" class="not-found">
    {{  t("post_not_found")  }}
  </div>
  <PostCreate v-if="posts.getPost(postId)" :postId="postId" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-if="posts.getPost(postId)" v-for="post in  posts.getPostComments(postId)" :post="post" :key="post.id" />
  </LoaderContainer>
</template>

<style lang="scss" scoped>
.post-wrapper {
  &>* {
    border-bottom: 1px dashed #000000;
  }
}

.main-post {
  border-bottom: 0;
}

.not-found {
  padding: 1rem 0;
}
</style>