<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import type { IPost, IUser } from '../../../shared/types';
import Post from './Post.vue';

const { user } = defineProps<{ user: IUser | null }>();

const posts = usePosts();
const users = useUsers();

const fetchedPosts = ref<IPost[] | null>(null);

const fetch = async () => {
  if (user === null) {
    await posts.fetchFeedPosts();
    // TODO: Implement
  }
  else {
    await posts.fetchUserPosts(user.id);
    fetchedPosts.value = posts.getAllPostsByUser(user);
  }
}

fetch();
</script>

<template>
  <Post v-for="post in fetchedPosts" :post="post" :key="post.id" />
</template>