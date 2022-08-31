<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import LoaderContainer from '../components/LoaderContainer.vue';
import Post from '../components/Post.vue';

const posts = usePosts();

const onInit = () => posts.fetchBookmarkedPosts("newer", true)
const onTop = () => posts.fetchBookmarkedPosts("newer")
const onBottom = () => posts.fetchBookmarkedPosts("older")
</script>

<template>
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-for="post in  posts.getBookmarkedPosts" :post="post" :key="post.id" />
  </LoaderContainer>
</template>
