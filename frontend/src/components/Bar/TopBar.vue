<script lang="ts" setup>
import MenuIcon from "../Icons/MenuIcon.vue";
import BackIcon from "../Icons/BackIcon.vue";
import router from "@/router";
</script>

<template>
  <div>
    <div class="container">
      <div class="content">
        <span class="right">
          <BackIcon class="icon" v-if="router.currentRoute.value.meta.showBackButton" />
          <span class="title">Home</span>
        </span>
        <MenuIcon class="icon" />
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
}

.content {
  max-width: 640px;
  height: inherit;

  padding: 0 1rem;
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
}

.icon {
  box-sizing: content-box;
  cursor: pointer;
  padding: 0.5rem;
}
</style>