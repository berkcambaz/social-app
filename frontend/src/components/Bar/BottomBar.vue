<script lang="ts" setup>
import HomeIcon from "../Icons/HomeIcon.vue";
import SearchIcon from "../Icons/SearchIcon.vue";
import UserIcon from "../Icons/UserIcon.vue";
import SendIcon from "../Icons/SendIcon.vue";
import router from "@/router";
import { useUsers } from "@/stores/users";
import type { IUser } from "../../../../shared/types";

const users = useUsers();

const gotoHome = () => {
  router.push('/home')
}

const gotoUser = async () => {
  let user: IUser | null;

  user = users.getCurrentUser;
  if (user === null && users.$state.current !== null) await users.fetchUserById(users.$state.current);
  user = users.getCurrentUser;

  router.push(`/user/${users.getCurrentUser?.tag}`);
}
</script>

<template>
  <div v-if="!router.currentRoute.value.meta.forGuests">
    <div class="container">
      <div class="content">
        <HomeIcon class="icon" :class="{
          active: router.currentRoute.value.name === 'home'
        }" @click="gotoHome()" />
        <SearchIcon class="icon" />
        <UserIcon class="icon" :class="{ active: router.currentRoute.value.name === 'user' }" @click="gotoUser()" />
        <SendIcon class="icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 3rem;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #ffffff;
  border-top: 1px solid #000000;

  z-index: 999;
}

.content {
  max-width: 640px;
  height: inherit;

  padding: 0 1rem;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.icon {
  cursor: pointer;

  &.active {
    stroke-width: 2px;
  }
}
</style>