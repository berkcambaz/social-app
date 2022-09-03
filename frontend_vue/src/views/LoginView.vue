<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import { createLoader } from '../util/loader';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { i18n } from '@/util/i18n';

const { t } = i18n.global;
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

const gotoSignup = () => {
  const to = router.currentRoute.value.query.to;
  router.push(`/signup${to ? `?to=${to}` : ``}`);
}
</script>

<template>
  <div class="signup">
    <Input type="text" :text="usertagText" :placeholder="`${t('usertag')}...`" />
    <Input type="password" :text="passwordText" :placeholder="`${t('password')}...`" />
    <Button @click="login()" :disabled="loader.status">{{  t("login")  }}</Button>
    <span class="text" @click="gotoSignup()">{{  t("i_dont_have_an_account")  }}</span>
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