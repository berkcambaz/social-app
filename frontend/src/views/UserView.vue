<script setup lang="ts">
import User from "../components/User.vue";
import PostLister from "../components/PostLister.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import type { IUser } from "../../../shared/types";

const users = useUsers();
const usertag = router.currentRoute.value.params["tag"] as string;
</script>

<template>
  <User :user="users.getUserByTag(usertag)" />
  <PostLister />
</template>
