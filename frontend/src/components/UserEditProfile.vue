<script setup lang="ts">
import { useUsers } from '@/stores/users';
import { createLoader } from '@/util/loader';
import { onMounted, ref } from 'vue';
import type { IUser } from '../../../shared/types';
import Loader from './Loader.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { i18n } from '@/util/i18n';
import HoverMenu from './HoverMenu.vue';

const { t } = i18n.global;
const { show, user } = defineProps<{ show: boolean, user: IUser }>();
const users = useUsers();
const loader = createLoader();

const usernameText = ref({
  limit: 32,
  current: 0,
  value: "",
  type: "single" as const
});
const bioText = ref({
  limit: 256,
  current: 0,
  value: "",
  type: "multi" as const
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
  <HoverMenu :show="show || loader.status">
    <div class="container">
      <div class="text-section">
        <label for="username">{{  t("username")  }}</label>
        {{  `${usernameText.current}/${usernameText.limit}`  }}
      </div>
      <Input type="text" :text="usernameText" id="username" />
      <div class="text-section">
        <label for="bio">{{  t("bio")  }}</label>
        {{  `${bioText.current}/${bioText.limit}`  }}
      </div>
      <Input type="text" :text="bioText" id="bio" />
      <Button @click="async () => { if (await done()) show = false }" :disabled="loader.status">done</Button>
      <div v-if="loader.status" class="loader-container">
        <Loader />
      </div>
    </div>
  </HoverMenu>
</template>

<style lang="scss" scoped>
.container {
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

.loader-container {
  display: flex;
  justify-content: center;
}
</style>