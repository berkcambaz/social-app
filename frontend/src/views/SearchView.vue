<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';


const usertagInput = ref<HTMLInputElement | null>(null);

const search = () => {
  if (usertagInput.value === null) return;
  const usertag = usertagInput.value.value.trim();
  if (usertag === "") return;
  router.push(`/user/${usertag}`);
}
</script>

<template>
  <div class="search">
    <input type="text" class="input" ref="usertagInput" placeholder="usertag...">
    <button class="button" @click="search()">search</button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
}

.input {
  box-sizing: content-box;

  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
}

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
}
</style>
