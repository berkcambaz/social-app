<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { onMounted, onUnmounted } from "vue";
import PostCreate from "../components/PostCreate.vue";
import Post from "../components/Post.vue";
import Loader from "../components/Loader.vue";
import { createLoader } from "@/util/loader";

const posts = usePosts();
const midLoader = createLoader();
let loading = false;

midLoader.value.wait(posts.fetchFeedPosts("newer", true));

const onScroll = async (ev: Event) => {
  if (loading) return;
  loading = true;

  if (window.scrollY <= 0) {
    await posts.fetchFeedPosts("newer");
  }

  else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    await posts.fetchFeedPosts("older");
  }

  loading = false;
}

onMounted(() => { window.addEventListener("scroll", onScroll) })
onUnmounted(() => { window.removeEventListener("scroll", onScroll) })
</script>

<template>
  <PostCreate />
  <Loader v-if="midLoader.status" class="loader" />
  <Post v-else v-for="post in  posts.getFeedPosts" :post="post" :key="post.id" />
</template>

<style lang="scss" scoped>
.loader {
  margin: 1rem 0;
}
</style>
