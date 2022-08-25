<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/Bar/TopBar.vue'
import BottomBar from './components/Bar/BottomBar.vue'
import router from './router';
</script>

<template>
  <TopBar />
  <div class="container">
    <RouterView :key="router.currentRoute.value.fullPath" />
  </div>
  <BottomBar />
</template>

<style lang="scss">
@import "normalize.css";

body {
  overflow-y: scroll;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 640px;
  margin: 0 auto;

  padding: 3rem 2rem;
}
</style>