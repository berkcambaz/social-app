<script lang="ts" setup>
import HeartIcon from "./Icons/HeartIcon.vue";
import BookmarkIcon from "./Icons/BookmarkIcon.vue";
import type { IPost, IUser } from "../../../shared/types";
import { usePosts } from "@/stores/posts";
import router from "@/router";
import { ref } from "vue";
import { useUsers } from "@/stores/users";

const posts = usePosts();
const users = useUsers();
const { post } = defineProps<{ post: IPost }>();

const user = ref<IUser | null>(null);

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
      <span class="user-info" @click="router.push(`/user/${user.tag}`)">
        <span class="username">{{ user.name }}</span>
        <span class="usertag">@{{ user.tag }}</span>
      </span>
      <span class="date">16h</span>
    </div>
    <div class="mid">
      {{ post.content }}
    </div>
    <div class="bottom">
      <span>{{ post.likeCount }}</span>
      <HeartIcon class="icon" />
      <BookmarkIcon class="icon" />
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

.top {}

.mid {
  padding: 0.5rem 0 0.25rem 1rem;
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
}
</style>