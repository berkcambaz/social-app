<script lang="ts" setup>
</script>
  
<template>
  <button class="button">
    <slot></slot>
  </button>
</template>
  
<style lang="scss" scoped>
.button {
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  padding: 0.25rem 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
</style>