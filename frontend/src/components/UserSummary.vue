<script setup lang="ts">
import router from "@/router";
import { useUsers } from "@/stores/users";
import { date } from "@/util/date";
import { createLoader } from "@/util/loader";
import type { IUser } from "../../../shared/types";
import CalendarIcon from "./Icons/CalendarIcon.vue";
import Loader from "./Loader.vue";
import Button from "./Button.vue";

const users = useUsers();
const { user } = defineProps<{ user: IUser | null }>();

const follow = (user: IUser | null) => {
  if (user !== null) users.follow(user);
}

const gotoUser = (user: IUser | null) => {
  if (user !== null) router.push(`/user/${user.tag}`)
}
</script>

<template>
  <div v-if="!user" class="user-summary">
    <Loader />
  </div>
  <div v-else class="user-summary clickable" @click="gotoUser(user)">
    <span class="user-info-container">
      <span class="user-info">
        <span class="username dynamic">{{  user.name  }}</span>
        <span>@</span>
        <span class="dynamic">{{  user.tag  }}</span>
      </span></span>
    <div class="bio" v-show="user.bio.length > 0">{{  user.bio  }}</div>
    <div class="follow-container">
      <span>
        <span class="followings">{{  user.followingCount  }} following</span>
        <span class="followers">{{  user.followerCount  }} followers</span>
      </span>
      <Button class="follow-button" @click.stop="follow(user)" v-if="user.id !== users.current">
        {{  user.following ? "unfollow" : "follow"  }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-summary {
  padding: 1rem 0;
  border-bottom: 1px solid #000000;

  &.clickable {
    cursor: pointer;
  }
}

.user-info-container {
  display: flex;
  flex-direction: row;
}

.user-info {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: baseline;

  .dynamic {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.username {
  font-size: $font-big;
  white-space: pre;
  padding-right: 0.25rem;
}

.bio {
  padding: 0.5rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.follow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.followings {
  margin-right: 0.25rem;
}

.followers {
  margin-left: 0.25rem;
}

.follow-button {
  padding: 0.5rem 1.25rem;
}
</style>