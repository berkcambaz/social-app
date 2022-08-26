<script lang="ts" setup>
import HeartIcon from "./Icons/HeartIcon.vue";
import BookmarkIcon from "./Icons/BookmarkIcon.vue";
import type { IPost, IUser } from "../../../shared/types";
import { usePosts } from "@/stores/posts";
import router from "@/router";
import { ref } from "vue";
import { useUsers } from "@/stores/users";
import { date } from "@/util/date";
import MoreIcon from "./Icons/MoreIcon.vue";

const posts = usePosts();
const users = useUsers();
const { post } = defineProps<{ post: IPost }>();

const user = ref<IUser | null>(null);

const gotoUser = () => {
  if (user.value !== null) router.push(`/user/${user.value.tag}`);
}

const like = (post: IPost | null) => {
  if (post !== null) posts.like(post);
}

const bookmark = (post: IPost | null) => {
  if (post !== null) posts.bookmark(post);
}

const deletePost = () => {
  if (post.userId !== users.current) return;
  if (post !== null) posts.delete(post);
}

const fetch = async () => {
  user.value = users.getUserById(post.userId);
  if (user.value === null) await users.fetchUserById(post.userId);
  else return;
  user.value = users.getUserById(post.userId);
}

fetch();
</script>

<template>
  <div v-if="!user" class="post">Loading...</div>
  <div v-else class="post">
    <div class="top">
      <span>
        <span class="user-info" @click="gotoUser()">
          <span class="username">{{ user.name }}</span>
          <span class="usertag">@{{ user.tag }}</span>
        </span>
        <span class="date" :title="date.unix(post.date).format('lll')">
          {{ date.unix(post.date).fromNow() }}
        </span>
      </span>
      <span>
        <MoreIcon class="icon more" @click="deletePost()" />
      </span>
    </div>
    <div class="mid">
      {{ post.content }}
    </div>
    <div class="bottom">
      <span class="count">{{ post.likeCount }}</span>
      <HeartIcon class="icon" :class="{ active: post.liked }" @click="like(post)" />
      <BookmarkIcon class="icon" :class="{ active: post.bookmarked }" @click="bookmark(post)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  &:last-child {
    border-bottom: 0;
  }

  padding: 1rem 0;
  border-bottom: 1px solid #000000;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.mid {
  padding: 0 0 0.25rem 1rem;
}

.bottom {
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.user-info {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.username {}

.usertag {
  padding: 0 0.25rem;
}

.date {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.icon {
  cursor: pointer;

  &.active {
    fill: #000000;
  }

  &.more {
    position: relative;
    top: 0.125rem;
  }
}

.count {
  margin-right: 0.25rem;
}
</style>