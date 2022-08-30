<script setup lang="ts">
import router from "@/router";
import { useUsers } from "@/stores/users";
import { date } from "@/util/date";
import { nextTick, ref } from "vue";
import type { IUser } from "../../../shared/types";
import CalendarIcon from "./Icons/CalendarIcon.vue";
import Loader from "./Loader.vue";
import UserEditProfile from "./UserEditProfile.vue";

const users = useUsers();
const { user } = defineProps<{ user: IUser | null }>();
const editingProfile = ref(false);

const follow = (user: IUser | null) => {
  if (user !== null) users.follow(user);
}

const gotoFollowers = (user: IUser | null) => {
  if (user !== null) router.push(`/user/${user.tag}/followers`)
}

const gotoFollowings = (user: IUser | null) => {
  if (user !== null) router.push(`/user/${user.tag}/followings`)
}

const editProfile = () => {
  editingProfile.value = false;
  nextTick(() => { editingProfile.value = true; })
}
</script>

<template>
  <UserEditProfile v-if="editingProfile && user" :editingProfile="editingProfile" :user="user" />
  <div v-if="!user" class="user">
    <Loader />
  </div>
  <div v-else class="user">
    <div class="username">{{  user.name  }}</div>
    <div class="usertag">@{{  user.tag  }}</div>
    <div class="bio" v-show="user.bio.length > 0">{{  user.bio  }}</div>
    <div class="date">
      <CalendarIcon />
      <span>{{  date.unix(user.date).format('ll')  }}</span>
    </div>
    <div class="bottom">
      <span class="follow-container">
        <span class="followings" @click="gotoFollowings(user)">{{  user.followingCount  }} following</span>
        <span class="followers" @click="gotoFollowers(user)">{{  user.followerCount  }} followers</span>
      </span>
      <button class="button" @click="follow(user)" v-if="user.id !== users.current">
        {{  user.following ? "unfollow" : "follow"  }}
      </button>
      <button class="button" @click="editProfile()" v-if="user.id === users.current">edit profile</button>
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
  white-space: pre-wrap;
  word-break: break-word;
}

.usertag {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bio {
  padding-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.date {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .button {
    cursor: pointer;

    white-space: nowrap;

    border: 0;
    border-radius: 5px;

    background-color: #000000;
    color: #ffffff;

    padding: 0.5rem 1.25rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.75);
    }
  }
}

.follow-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.followings {
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 1px;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
  }
}

.followers {
  cursor: pointer;
  margin-bottom: 1px;
  white-space: nowrap;

  &:hover {
    border-bottom: 1px solid #000000;
    margin-bottom: 0;
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