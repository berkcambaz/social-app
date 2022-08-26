<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import { useUsers } from '@/stores/users';
import { onMounted, onUnmounted, ref } from 'vue';
import type { IPost, IUser } from '../../../shared/types';
import Post from './Post.vue';

const { user } = defineProps<{ user: IUser | null }>();

const posts = usePosts();

if (user === null) posts.fetchFeedPosts("newer");
else posts.fetchUserPosts(user.id, "newer");

const onScroll = (ev: Event) => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if (user === null) posts.fetchFeedPosts("older");
    else posts.fetchUserPosts(user.id, "older");
  }
}

onMounted(() => { window.addEventListener("scroll", onScroll) })
onUnmounted(() => { window.removeEventListener("scroll", onScroll) })
</script>

<template>
  <Post v-for="post in (user === null ? posts.getFeedPosts : posts.getUserPosts(user))" :post="post" :key="post.id" />
</template>