<script lang="ts" setup>
</script>
  
<template>
  <div class="loader"></div>
</template>
  
<style lang="scss" scoped>
.loader {
  border: 0.25rem solid #000000;
  border-top: 0.25rem solid #ffffff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>