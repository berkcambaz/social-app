<script setup lang="ts">
import { createLoader } from '@/util/loader';

const { show } = defineProps<{ show: boolean }>();
const loader = createLoader();

</script>
  
<template>
  <div class="user-edit-profile" v-if="show || loader.status">
    <div class="background" @click="show = false"></div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.user-edit-profile {
  position: absolute;
  margin-top: 1rem;
}

.background {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.25);
}

.container {
  z-index: 1001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border-radius: 5px;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  &>* {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>