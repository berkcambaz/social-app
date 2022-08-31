<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { createLoader } from '@/util/loader';
import { onMounted, ref } from 'vue';
import type { IUser } from '../../../shared/types';
import Loader from './Loader.vue';
import Input from './Input.vue';

const { editingProfile, user } = defineProps<{ editingProfile: boolean, user: IUser }>();
const users = useUsers();
const loader = createLoader();

const usernameText = ref({
  limit: 32,
  current: 0,
  value: "",
});
const bioText = ref({
  limit: 256,
  current: 0,
  value: "",
});

const done = async (): Promise<boolean> => {
  const username = usernameText.value.value;
  const bio = bioText.value.value;
  if (username.length === 0 || username.length > 32) return false;
  if (bio.length > 256) return false;
  await loader.value.wait(users.editUser(username, bio));
  return true;
}

onMounted(() => {
  if (!user) return;
  usernameText.value.value = user.name;
  usernameText.value.current = user.name.length;
  bioText.value.value = user.bio;
  bioText.value.current = user.bio.length;
})
</script>

<template>
  <div class="user-edit-profile" v-if="editingProfile || loader.status">
    <div class="background" @click="editingProfile = false"></div>
    <div class="container">
      <div class="text-section">
        <label for="username">username</label>
        {{  `${usernameText.current}/${usernameText.limit}`  }}
      </div>
      <Input :type="'single'" :text="usernameText" id="username" />
      <div class="text-section">
        <label for="bio">bio</label>
        {{  `${bioText.current}/${bioText.limit}`  }}
      </div>
      <Input :type="'multi'" :text="bioText" id="bio" />
      <button class="button" @click="async () => { if (await done()) editingProfile = false }"
        :disabled="loader.status">done</button>
      <div v-if="loader.status" class="loader-container">
        <Loader />
      </div>
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
  left: 50%;
  transform: translateX(-50%);

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

.text-section {
  display: flex;
  justify-content: space-between;
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

.loader-container {
  display: flex;
  justify-content: center;
}
</style>