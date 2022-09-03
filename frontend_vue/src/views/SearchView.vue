<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from "@/stores/users";
import type { IUser } from '../../../shared/types';
import UserSummary from '../components/UserSummary.vue';
import { createLoader } from '@/util/loader';
import Loader from '../components/Loader.vue';
import Input from '../components/Input.vue';
import { i18n } from '@/util/i18n';

const { t } = i18n.global;
const users = useUsers();
const userSummaries = ref<IUser[]>([]);
const loader = createLoader();
const typed: boolean[] = []
const searched = ref(false);

const text = ref({
  limit: 0,
  current: 0,
  value: "",
  type: "single" as const
});

const onInput = async () => {
  const user = text.value.value.trim();
  if (user.length === 0 || user.length > 32) {
    userSummaries.value = [];
    searched.value = false;
    return;
  }

  if (typed.length === 0) {
    loader.value.status = true;
    userSummaries.value = [];
  }
  typed.push(true);

  setTimeout(async () => {
    typed.pop();
    if (typed.length !== 0) return;
    loader.value.status = true;

    const summaries = await users.fetchSearchUser(user);

    if (typed.length !== 0) return;
    loader.value.status = false;

    if (text.value.current === 0) return;

    userSummaries.value = summaries;
    searched.value = true;
  }, 1000);
}
</script>

<template>
  <div class="search">
    <Input type="text" :text="text" :placeholder="`${t('user')}...`" @input="onInput()" />
    <Loader v-if="loader.status" />
    <div v-if="!loader.status && userSummaries.length === 0 && searched">
      {{t("no_users_found")}}
    </div>
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
</style>
