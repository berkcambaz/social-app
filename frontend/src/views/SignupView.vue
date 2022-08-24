<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = useUsers();

const usertagInput = ref<HTMLInputElement | null>();
const emailInput = ref<HTMLInputElement | null>();
const passwordInput = ref<HTMLInputElement | null>();

const signup = () => {
  if (!usertagInput.value || !emailInput.value || !passwordInput.value) return;
  const usertag = usertagInput.value.value;
  const email = emailInput.value.value;
  const password = passwordInput.value.value;
  users.signup(usertag, email, password);
}
</script>

<template>
  <div class="signup">
    <input type="text" class="input" ref="usertagInput" placeholder="usertag...">
    <input type="email" class="input" ref="emailInput" placeholder="email...">
    <input type="password" class="input" ref="passwordInput" placeholder="password...">
    <button class="button" @click="signup()">signup</button>
    <span class="text" @click="router.push('/login')">i already have an account</span>
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
}

.text {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}
</style>