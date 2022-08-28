<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import { createLoader } from '../util/loader';

const router = useRouter();
const users = useUsers();

const usertagInput = ref<HTMLInputElement | null>();
const passwordInput = ref<HTMLInputElement | null>();
const loader = createLoader();

const login = () => {
  if (!usertagInput.value || !passwordInput.value) return;
  const usertag = usertagInput.value.value;
  const password = passwordInput.value.value;
  loader.value.wait(users.login(usertag, password));
}
</script>

<template>
  <div class="signup">
    <input type="text" class="input" ref="usertagInput" placeholder="usertag...">
    <input type="password" class="input" ref="passwordInput" placeholder="password...">
    <button class="button" @click="login()" :disabled="loader.status">login</button>
    <span class="text" @click="router.push('/signup')">i don't have an account</span>
    <Loader v-if="loader.status" />
  </div>
</template>

<style lang="scss" scoped>
.signup {
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

  &:disabled {
    background-color: rgba(0, 0, 0, 0.25);
  }
}

.text {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}
</style>