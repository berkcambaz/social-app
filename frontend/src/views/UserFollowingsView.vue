<script setup lang="ts">
import router from '@/router';
import { useUsers } from '@/stores/users';
import { createLoader } from '@/util/loader';
import { onMounted, onUnmounted, ref } from 'vue';
import type { IUser } from '../../../shared/types';
import User from '../components/User.vue';
import UserSummary from '../components/UserSummary.vue';
import Loader from '../components/Loader.vue';

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
const user = ref<IUser | null>(null);
const userLoader = createLoader();
const userSummariesLoader = createLoader();

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
  await userLoader.value.wait(users.fetchUserByTag(usertag));
  user.value = users.getUserByTag(usertag);
  if (user.value !== null)
    userSummariesLoader.value.wait(users.fetchUserFollowings(user.value.id, "newer", true));
}

fetch();
</script>

<template>
  <User :user="user" :searching="userLoader.status" />
  <Loader v-if="userSummariesLoader.status" class="loader" />
  <UserSummary v-if="!userSummariesLoader.status" v-for="follower in users.getFollowings(user)" :user="follower"
    :key="follower.id" />
</template>

<style lang="scss" scoped>
.loader {
  margin: 1rem 0;
}
</style>