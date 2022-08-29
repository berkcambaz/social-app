<script setup lang="ts">
import router from '@/router';
import { useUsers } from '@/stores/users';
import { onMounted, onUnmounted, ref } from 'vue';
import type { IUser } from '../../../shared/types';
import User from '../components/User.vue';
import UserSummary from '../components/UserSummary.vue';

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
const user = ref<IUser | null>(null);

const onScroll = (ev: Event) => {
  if (window.scrollY <= 0) {
    if (user.value !== null) users.fetchUserFollowings(user.value.id, "newer");
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if (user.value !== null) users.fetchUserFollowings(user.value.id, "older");
  }
}

onMounted(() => { window.addEventListener("scroll", onScroll) })
onUnmounted(() => { window.removeEventListener("scroll", onScroll) })

const fetch = async () => {
  if (usertag === undefined) return;

  await users.fetchUserByTag(usertag);
  user.value = users.getUserByTag(usertag);
  if (user.value !== null) users.fetchUserFollowings(user.value.id, "newer", true);
}

fetch();
</script>

<template>
  <User :user="user" />
  <UserSummary v-for="follower in users.getFollowings(user)" :user="follower" :key="follower.id" />
</template>
