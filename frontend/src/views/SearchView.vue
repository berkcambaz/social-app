<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from "@/stores/users";
import type { IUser } from '../../../shared/types';
import UserSummary from '../components/UserSummary.vue';
import { createLoader } from '@/util/loader';
import Loader from '../components/Loader.vue';

const users = useUsers();
const userInput = ref<HTMLInputElement | null>(null);
const userSummaries = ref<IUser[]>([]);
const loader = createLoader();
const typed: boolean[] = []

const onInput = async () => {
  if (userInput.value === null) return;

  const user = userInput.value.value.trim();
  if (user === "") return;

  if (typed.length === 0) {
    loader.value.status = true;
    userSummaries.value = [];
  }
  typed.push(true);

  setTimeout(async () => {
    typed.pop();
    if (typed.length === 0)
      userSummaries.value = await loader.value.wait(users.fetchSearchUser(user))
  }, 1000);
}
</script>

<template>
  <div class="search">
    <input type="text" class="input" ref="userInput" placeholder="user..." @input="onInput()">
    <Loader v-if="loader.status" />
    <div v-if="!loader.status && userSummaries.length === 0">no users found</div>
  </div>
  <div>
    <UserSummary v-for="user in userSummaries" :user="user" />
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
