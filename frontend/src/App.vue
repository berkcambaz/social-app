<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/Bar/TopBar.vue'
import BottomBar from './components/Bar/BottomBar.vue'
import router from './router';
import Loader from './components/Loader.vue';
import { useApp } from './stores/app';

const app = useApp();
</script>

<template>
  <Loader v-if="app.loading !== 'done'" />
  <TopBar v-show="app.initialLoad === 'done'" />
  <div class="container" v-if="app.loading === 'done'">
    <RouterView :key="router.currentRoute.value.fullPath" />
  </div>
  <BottomBar v-show="app.initialLoad === 'done'" />
</template>

<style lang="scss">
@import "normalize.css";

body {
  overflow-y: scroll;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  // Disable highlight on mobile's when clicking
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

* {
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 640px;
  margin: 0 auto;

  padding: 3rem 1rem;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>