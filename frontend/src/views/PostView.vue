<script setup lang="ts">
import router from '@/router';
import Post from '../components/Post.vue';
import LoaderContainer from '../components/LoaderContainer.vue';
import { ref } from 'vue';
import type { IPost } from '../../../shared/types';
import { usePosts } from '@/stores/posts';
import PostCreate from '../components/PostCreate.vue';
import { createLoader } from '@/util/loader';
import { i18n } from '@/util/i18n';

const posts = usePosts();
const { t } = i18n.global;
const mainPost = ref<IPost | null>(null);
const postId = parseInt(router.currentRoute.value.params["id"] as string);
let mainPostLoading = ref(true);

const onInit = async () => {
  // TODO: Implement post not found
  await posts.fetchPost(postId);
  mainPost.value = posts.getPost(postId);
  mainPostLoading.value = false;
  if (mainPost.value === null) return;
  await posts.fetchPostComments(mainPost.value.id, "newer", true);
}

const onTop = async () => {
  if (mainPost.value) await posts.fetchPostComments(mainPost.value.id, "newer")
}

const onBottom = async () => {
  if (mainPost.value) await posts.fetchPostComments(mainPost.value.id, "older")
}
</script>

<template>
  <Post v-if="mainPost" :post="mainPost" class="main-post" />
  <div v-if="!mainPost && !mainPostLoading" class="not-found">
    {{  t("post_not_found")  }}
  </div>
  <PostCreate v-if="mainPost" :postId="mainPost.id" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-if="mainPost" v-for="post in  posts.getPostComments(mainPost)" :post="post" :key="post.id" />
  </LoaderContainer>
</template>

<style lang="scss" scoped>
.main-post {
  border-bottom: 0;
}

.not-found {
  padding: 1rem 0;
}
</style>