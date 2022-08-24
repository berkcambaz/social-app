<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import { useUsers } from '@/stores/users';
import type { IUser } from '../../../shared/types';
import Post from './Post.vue';

const { user } = defineProps<{ user: IUser | null }>();

const posts = usePosts();
const users = useUsers();

posts.get(user === null ? -1 : user.id);
</script>

<template>
  <Post v-for="post in (user === null ? posts.getAllPosts : posts.getAllPostsByUser(user))" :post="post"
    :user="users.getUserById(post.userId)" :key="post.id" />
</template>