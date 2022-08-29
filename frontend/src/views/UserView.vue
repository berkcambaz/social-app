<script setup lang="ts">
import User from "../components/User.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import type { IUser } from "../../../shared/types";
import { onMounted, onUnmounted, ref } from "vue";
import { usePosts } from "@/stores/posts";
import Post from "../components/Post.vue";
import { createLoader } from "@/util/loader";
import Loader from "../components/Loader.vue";

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
const posts = usePosts();
const user = ref<IUser | null>(null);
const userLoader = createLoader();
const postsLoader = createLoader();

const onScroll = (ev: Event) => {
  if (window.scrollY <= 0) {
    if (user.value !== null) posts.fetchUserPosts(user.value.id, "newer");
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if (user.value !== null) posts.fetchUserPosts(user.value.id, "older");
  }
}

const fetch = async () => {
  if (usertag === undefined) return;
  await userLoader.value.wait(users.fetchUserByTag(usertag));
  user.value = users.getUserByTag(usertag);
  if (user.value !== null)
    postsLoader.value.wait(posts.fetchUserPosts(user.value.id, "newer", true));
}

fetch();
onMounted(() => { window.addEventListener("scroll", onScroll) });
onUnmounted(() => { window.removeEventListener("scroll", onScroll) });
</script>

<template>
  <User :user="user" />
  <Loader v-if="postsLoader.status" class="loader" />
  <Post v-if="!postsLoader.status && user" v-for="post in  posts.getUserPosts(user)" :post="post" :key="post.id" />
</template>

<style lang="scss" scoped>
.loader {
  margin: 1rem 0;
}
</style>