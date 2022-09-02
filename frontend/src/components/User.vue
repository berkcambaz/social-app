<script setup lang="ts">
import router from "@/router";
import { useUsers } from "@/stores/users";
import { date } from "@/util/date";
import { nextTick, ref } from "vue";
import type { IUser } from "../../../shared/types";
import CalendarIcon from "./Icons/CalendarIcon.vue";
import Loader from "./Loader.vue";
import UserEditProfile from "./UserEditProfile.vue";
import Button from "./Button.vue";
import { i18n } from "@/util/i18n";

const users = useUsers();
const { t } = i18n.global;
const { user, searching } = defineProps<{ user: IUser | null, searching: boolean }>();
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
  <div v-if="!user && !searching" class="user">{{  t("user_not_found")  }}</div>
  <div v-if="!user && searching" class="user">
    <Loader />
  </div>
  <div v-if="user" class="user">
    <div class="username">{{  user.name  }}</div>
    <div class="usertag-container">
      <span class="usertag">
        <span>@</span>
        <span class="dynamic">{{  user.tag  }}</span>
        <span class="follows-you" v-if="user.follower">{{  t("follows_you")  }}</span>
      </span>
    </div>
    <div class="bio" v-show="user.bio.length > 0">{{  user.bio  }}</div>
    <div class="date">
      <CalendarIcon />
      <span>{{  date.unix(user.date).format('ll')  }}</span>
    </div>
    <div class="bottom">
      <span class="follow-container">
        <span class="followings" @click="gotoFollowings(user)">
          {{  `${user.followingCount} ${t("following_count", user.followingCount)}`  }}
        </span>
        <span class="followers" @click="gotoFollowers(user)">
          {{  `${user.followerCount} ${t("follower_count", user.followerCount)}`  }}
        </span>
      </span>
      <Button class="button" @click="follow(user)" v-if="user.id !== users.current">
        {{  user.following ? t("unfollow") : t("follow")  }}
      </Button>
      <Button class="button" @click="editProfile()" v-if="user.id === users.current">
        {{  t("edit_profile")  }}
      </Button>
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

.usertag-container {
  display: flex;
  flex-direction: row;
}

.usertag {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: baseline;

  .dynamic {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.follows-you {
  border-bottom: 1px solid #000000;
  margin-left: 0.5rem;
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
    white-space: nowrap;
    padding: 0.5rem 1.25rem;
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
</style>