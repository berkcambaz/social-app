<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { onMounted, onUnmounted } from "vue";
import PostCreate from "../components/PostCreate.vue";
import Post from "../components/Post.vue";

const posts = usePosts();
posts.fetchFeedPosts("newer", true);

const onScroll = (ev: Event) => {
  if (window.scrollY <= 0) {
    posts.fetchFeedPosts("newer");
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    posts.fetchFeedPosts("older");
  }
}

onMounted(() => { window.addEventListener("scroll", onScroll) })
onUnmounted(() => { window.removeEventListener("scroll", onScroll) })
</script>

<template>
  <PostCreate />
  <Post v-for="post in  posts.getFeedPosts" :post="post" :key="post.id" />
</template>
