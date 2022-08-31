<script lang="ts" setup>
import MenuIcon from "../Icons/MenuIcon.vue";
import BackIcon from "../Icons/BackIcon.vue";
import router from "@/router";

const toggleMenu = () => {
  if (router.currentRoute.value.name === "menu") router.back();
  else router.push("/menu");
}
</script>

<template>
  <div>
    <div class="container">
      <div class="content">
        <span class="right">
          <BackIcon class="icon right" @click="router.back()" v-if="router.currentRoute.value.meta.showBackButton" />
          <span class="title">{{  router.currentRoute.value.name  }}</span>
        </span>
        <MenuIcon class="icon" @click="toggleMenu()" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 3rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: #ffffff;
  border-bottom: 1px solid #000000;

  z-index: 999;
}

.content {
  max-width: 640px;
  height: inherit;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.right {
  display: flex;
  align-items: center;
}

.title {
  font-size: $font-big;
  margin-left: 3rem;
}

.icon {
  box-sizing: content-box;
  cursor: pointer;
  padding: 0.5rem;

  &.right {
    position: absolute;
  }
}
</style>