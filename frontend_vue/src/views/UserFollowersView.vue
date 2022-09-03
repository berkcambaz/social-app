<script setup lang="ts">
import router from '@/router';
import { useUsers } from '@/stores/users';
import { createLoader } from '@/util/loader';
import { ref } from 'vue';
import type { IUser } from '../../../shared/types';
import User from '../components/User.vue';
import UserSummary from '../components/UserSummary.vue';
import LoaderContainer from '../components/LoaderContainer.vue';

const usertag = router.currentRoute.value.params["tag"] as string;

const users = useUsers();
const user = ref<IUser | null>(null);
const userLoader = createLoader();

const onInit = async () => {
  if (usertag === undefined) return;
  await userLoader.value.wait(users.fetchUserByTag(usertag));
  user.value = users.getUserByTag(usertag);
  if (user.value !== null)
    await users.fetchUserFollowers(user.value.id, "newer", true);
}

const onTop = async () => {
  if (user.value !== null) await users.fetchUserFollowers(user.value.id, "newer");
}

const onBottom = async () => {
  if (user.value !== null) await users.fetchUserFollowers(user.value.id, "older");
}
</script>

<template>
  <User :user="user" :searching="userLoader.status" />
  <LoaderContainer :onInit="onInit" :onTop="onTop" :onBottom="onBottom">
    <UserSummary v-for="follower in users.getFollowers(user)" :user="follower" :key="follower.id" />
  </LoaderContainer>
</template>
