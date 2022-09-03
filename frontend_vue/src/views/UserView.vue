<script setup lang="ts">
import User from "../components/User.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import type { IUser } from "../../../shared/types";
import { ref } from "vue";
import { usePosts } from "@/stores/posts";
import Post from "../components/Post.vue";
import { createLoader } from "@/util/loader";
import LoaderContainer from "../components/LoaderContainer.vue";

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
const posts = usePosts();
const user = ref<IUser | null>(null);
const userLoader = createLoader();

const onInit = async () => {
  if (usertag === undefined) return;
  await userLoader.value.wait(users.fetchUserByTag(usertag));
  user.value = users.getUserByTag(usertag);
  if (user.value !== null)
    await posts.fetchUserPosts(user.value.id, "newer", true);
}

const onTop = async () => {
  if (user.value !== null) await posts.fetchUserPosts(user.value.id, "newer");
}

const onBottom = async () => {
  if (user.value !== null) await posts.fetchUserPosts(user.value.id, "older");
}
</script>

<template>
  <User :user="user" :searching="userLoader.status" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <Post v-if="user" v-for="post in  posts.getUserPosts(user)" :post="post" :key="post.id" />
  </LoaderContainer>
</template>