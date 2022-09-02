<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import Post from "../components/Post.vue";
import LoaderContainer from "../components/LoaderContainer.vue";

const posts = usePosts();

const onInit = () => posts.fetchFeedPosts("newer", true)
const onTop = () => posts.fetchFeedPosts("newer")
const onBottom = () => posts.fetchFeedPosts("older")
</script>

<template>
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-for="post in  posts.getFeedPosts" :post="post" :key="post.id" />
  </LoaderContainer>
</template>
