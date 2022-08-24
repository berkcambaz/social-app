<script setup lang="ts">
import PostCreate from "../components/PostCreate.vue";
import PostLister from "../components/PostLister.vue";
</script>

<template>
  <PostCreate />
  <PostLister :user="null" />
</template>
