<script setup lang="ts">
import User from "../components/User.vue";
import PostLister from "../components/PostLister.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import type { IUser } from "../../../shared/types";
import { ref } from "vue";

const usertag = router.currentRoute.value.params["tag"] as string;
</script>

<template>
  <User :usertag="usertag" />
  <!--<PostLister v-if="user !== null" :user="user" />-->
</template>
