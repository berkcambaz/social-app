<script setup lang="ts">
</script>

<template>
  <div class="about">
    <div class="title">Chernolink</div>
    <div>&copy; 2022 Chernolink</div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &>* {
    margin: 1rem 0;
  }
}

.title {
  font-size: $font-big;
}
</style>
  