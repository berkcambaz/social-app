<script setup lang="ts">
import { useUsers } from "@/stores/users";
import { ref } from "vue";
import type { IUser } from "../../../shared/types";
import CalendarIcon from "./Icons/CalendarIcon.vue";

const { userId, usertag } = defineProps<{ userId?: number, usertag?: string }>();

const users = useUsers();
const user = ref<IUser | null>(null);

const fetch = async () => {
  if (userId !== undefined) user.value = users.getUserById(userId);
  else if (usertag !== undefined) user.value = users.getUserByTag(usertag);

  if (user.value === null) {
    if (userId !== undefined) await users.fetchUserById(userId);
    else if (usertag !== undefined) await users.fetchUserByTag(usertag);
  }

  if (userId !== undefined) user.value = users.getUserById(userId);
  else if (usertag !== undefined) user.value = users.getUserByTag(usertag);
}

const follow = () => {

}

fetch();
</script>

<template>
  <div v-if="!user" class="user">Loading...</div>
  <div v-else class="user">
    <div class="username">{{ user.name }}</div>
    <div>@{{ user.tag }}</div>
    <div class="bio">{{ user.bio }}</div>
    <div class="date">
      <CalendarIcon />
      <span>January 2022</span>
    </div>
    <div class="follow-container">
      <span>
        <span class="followings">{{ user.followingCount }} following</span>
        <span class="followers">{{ user.followerCount }} followers</span>
      </span>
      <button class="follow-button" @click="follow()" v-if="user.id !== users.current">
        {{ user.following ? "unfollow" : "follow" }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
}

.username {
  font-size: $font-big;
}

.bio {
  padding: 0.5rem 0;
}

.date {
  display: flex;
  align-items: center;
}

.follow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 0.5rem;
}

.followers {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.followings {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.follow-button {
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  padding: 0.5rem 1.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
}
</style>