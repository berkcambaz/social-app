<script lang="ts" setup>
import MenuIcon from "../Icons/MenuIcon.vue";
</script>

<template>
  <div>
    <div class="container">
      <div class="content">
        <span class="title">Home</span>
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

.title {
  font-size: $font-big;
}

.icon {
  cursor: pointer;
}
</style>