<script setup lang="ts">
import { useUsers } from "@/stores/users";
import { date } from "@/util/date";
import type { IUser } from "../../../shared/types";
import CalendarIcon from "./Icons/CalendarIcon.vue";

const users = useUsers();
const { user } = defineProps<{ user: IUser | null }>();

const follow = (user: IUser | null) => {
  if (user !== null) users.follow(user);
}
</script>

<template>
  <div v-if="!user" class="user">Loading...</div>
  <div v-else class="user">
    <div class="username">{{ user.name }}</div>
    <div>@{{ user.tag }}</div>
    <div class="bio">{{ user.bio }}</div>
    <div class="date">
      <CalendarIcon />
      <span>{{ date.unix(user.date).format('ll') }}</span>
    </div>
    <div class="follow-container">
      <span>
        <span class="followings">{{ user.followingCount }} following</span>
        <span class="followers">{{ user.followerCount }} followers</span>
      </span>
      <button class="follow-button" @click="follow(user)" v-if="user.id !== users.current">
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

.followings {
  margin-right: 0.25rem;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.followers {
  margin-left: 0.25rem;
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