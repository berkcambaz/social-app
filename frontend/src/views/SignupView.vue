<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { createLoader } from '@/util/loader';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import { validate } from "email-validator"

const router = useRouter();
const users = useUsers();

const usertagInput = ref<HTMLInputElement | null>();
const emailInput = ref<HTMLInputElement | null>();
const passwordInput = ref<HTMLInputElement | null>();

const loader = createLoader();

const usertagInfo = ref(false);
const emailInfo = ref(false);
const passwordInfo = ref(false);

const errors = ref({
  usertagLength: true,
  usertagCharacters: false,
  passwordLength: true,
  emailValid: true
});

const signup = () => {
  if (!usertagInput.value || !emailInput.value || !passwordInput.value) return;
  const usertag = usertagInput.value.value;
  const email = emailInput.value.value;
  const password = passwordInput.value.value;
  loader.value.wait(users.signup(usertag, email, password));
}

const usertagError = () => {
  return errors.value.usertagCharacters || errors.value.usertagLength;
}

const emailError = () => {
  return errors.value.emailValid;
}

const passwordError = () => {
  return errors.value.passwordLength;
}

const onUsertagInput = () => {
  if (!usertagInput.value) return;
  const usertag = usertagInput.value.value;
  errors.value.usertagLength = usertag.length < 3 || usertag.length > 16;
  errors.value.usertagCharacters = !/^[a-z0-9]*$/.test(usertag);
}

const onEmailInput = () => {
  if (!emailInput.value) return;
  const email = emailInput.value.value;
  errors.value.emailValid = !validate(email);
}

const onPasswordInput = () => {
  if (!passwordInput.value) return;
  const password = passwordInput.value.value;
  errors.value.passwordLength = password.length < 8;
}

const onFocusUsertag = () => { usertagInfo.value = true; }
const onBlurUsertag = () => { usertagInfo.value = false; }
const onFocusEmail = () => { emailInfo.value = true; }
const onBlurEmail = () => { emailInfo.value = false; }
const onFocusPassword = () => { passwordInfo.value = true; }
const onBlurPassword = () => { passwordInfo.value = false; }
</script>

<template>
  <div class="signup">
    <div>
      <input type="text" class="input" ref="usertagInput" placeholder="usertag..." @input="onUsertagInput"
        @focus="onFocusUsertag" @blur="onBlurUsertag" :class="{ error: usertagError() && !usertagInfo }">
      <div class="info" v-if="usertagInfo">
        <div :class="{ error: errors.usertagLength }">must be 3 - 16 characters</div>
        <div :class="{ error: errors.usertagCharacters }">can contain lowercase letters a-z</div>
        <div :class="{ error: errors.usertagCharacters }">can contains numbers 0-9</div>
      </div>
    </div>
    <div>
      <input type="email" class="input" ref="emailInput" placeholder="email..." @input="onEmailInput"
        @focus="onFocusEmail" @blur="onBlurEmail" :class="{ error: emailError() && !emailInfo }">
      <div class="info" v-if="emailInfo">
        <div :class="{ error: errors.emailValid }">must be valid</div>
      </div>
    </div>
    <div>
      <input type="password" class="input" ref="passwordInput" placeholder="password..." @input="onPasswordInput"
        @focus="onFocusPassword" @blur="onBlurPassword" :class="{ error: passwordError() && !passwordInfo }">
      <div class="info" v-if="passwordInfo">
        <div :class="{ error: errors.passwordLength }">must be at least 8 characters</div>
      </div>
    </div>
    <button class="button" @click="signup()" :disabled="loader.status">signup</button>
    <span class="text" @click="router.push('/login')">i already have an account</span>
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

.info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
}

.error {
  color: red;
}
</style>