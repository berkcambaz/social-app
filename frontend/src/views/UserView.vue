<script setup lang="ts">
import User from "../components/User.vue";
import PostLister from "../components/PostLister.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import type { IUser } from "../../../shared/types";
import { ref } from "vue";

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
let user = ref<IUser | null>(null);

const fetch = async () => {
  user.value = users.getUserByTag(usertag);

  if (user.value) return;
  await users.fetchUserByTag(usertag);

  user.value = users.getUserByTag(usertag);
}

fetch();
</script>

<template>
  <User :user="user" />
  <PostLister v-if="user !== null" :user="user" />
</template>
