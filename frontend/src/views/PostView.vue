<script setup lang="ts">
import router from '@/router';
import { usePosts } from '@/stores/posts';
import { ref } from 'vue';
import type { IPost } from '../../../shared/types';
import Post from '../components/Post.vue';
import LoaderContainer from '../components/LoaderContainer.vue';
import HoverMenu from '../components/HoverMenu.vue';

const postId = parseInt(router.currentRoute.value.params.id as string);
const posts = usePosts();
const post = ref<IPost | null>(null);

const showCreateComment = ref(false);
const showCreateReply = ref(false);

const onInit = async () => {
  await posts.fetchPost(postId);
  post.value = posts.getPost(postId);
};

const onTop = async () => { }
const onBottom = async () => { }
</script>

<template>
  <Post class="main-post" v-if="post" :post="post" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">

  </LoaderContainer>
</template>

<style lang="scss" scoped>
.main-post {
  border-bottom: 0;
}
</style>
  