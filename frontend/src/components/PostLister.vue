<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import type { IPost, IUser } from '../../../shared/types';
import Post from './Post.vue';

const { user } = defineProps<{ user: IUser | null }>();

const posts = usePosts();

if (user === null) posts.fetchFeedPosts();
else posts.fetchUserPosts(user.id);
</script>

<template>
  <Post v-for="post in (user === null ? posts.getFeedPosts : posts.getUserPosts(user))" :post="post" :key="post.id" />
</template>