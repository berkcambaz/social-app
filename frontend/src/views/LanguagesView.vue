<script setup lang="ts">
import CheckIcon from "../components/Icons/CheckIcon.vue";
</script>

<template>
  <div class="menu">
    <div class="item">
      <CheckIcon class="icon" />
      <img src="@/assets/lang/usa.svg" class="img">
    </div>
    <div class="item">
      <CheckIcon class="icon hidden" />
      <img src="@/assets/lang/turkey.svg" class="img">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center;
  width: 100%;

  cursor: pointer;

  padding: 0.75rem;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }

  .icon {
    margin-right: 1rem;

    &.hidden {
      visibility: hidden;
    }
  }

  .img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
  