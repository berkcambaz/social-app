<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import { createLoader } from '../util/loader';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

const router = useRouter();
const users = useUsers();

const usertagText = ref({ limit: 16, current: 0, value: "", type: "single" as const })
const passwordText = ref({ limit: 9999, current: 0, value: "", type: "single" as const })
const loader = createLoader();

const login = () => {
  const usertag = usertagText.value.value;
  const password = passwordText.value.value;
  loader.value.wait(users.login(usertag, password));
}
</script>

<template>
  <div class="signup">
    <Input type="text" :text="usertagText" placeholder="usertag..." />
    <Input type="password" :text="passwordText" placeholder="password..." />
    <Button @click="login()" :disabled="loader.status">login</Button>
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

.text {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}
</style>