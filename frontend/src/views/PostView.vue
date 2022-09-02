<script setup lang="ts">
import router from '@/router';
import Post from '../components/Post.vue';
import LoaderContainer from '../components/LoaderContainer.vue';
import { ref } from 'vue';
import type { IPost } from '../../../shared/types';
import { usePosts } from '@/stores/posts';
import PostCreate from '../components/PostCreate.vue';

const posts = usePosts();
const mainPost = ref<IPost | null>(null);
const postId = parseInt(router.currentRoute.value.params["id"] as string);

const onInit = async () => {
  // TODO: Implement post not found
  await posts.fetchPost(postId);
  mainPost.value = posts.getPost(postId);
  if (mainPost.value === null) return;
  await posts.fetchPostComments(mainPost.value.id, "newer", true);
}

const onTop = async () => {

}

const onBottom = async () => {

}
</script>

<template>
  <PostCreate v-if="mainPost" :postId="mainPost.id" />
  <Post v-if="mainPost" :post="mainPost" class="main-post" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-if="mainPost" v-for="post in  posts.getPostComments(mainPost)" :post="post" :key="post.id" />
  </LoaderContainer>
</template>

<style lang="scss" scoped>
.main-post {
  border-top: 1px solid #000000;
}
</style>