<script lang="ts" setup>
import HomeIcon from "../Icons/HomeIcon.vue";
import SearchIcon from "../Icons/SearchIcon.vue";
import UserIcon from "../Icons/UserIcon.vue";
import SendIcon from "../Icons/SendIcon.vue";
import router from "@/router";
import { useUsers } from "@/stores/users";

const users = useUsers();
</script>

<template>
  <div v-if="!router.currentRoute.value.meta.forGuests">
    <div class="container">
      <div class="content">
        <HomeIcon class="icon" @click="router.push('/home')" />
        <SearchIcon class="icon" />
        <UserIcon class="icon" @click="router.push(`/user/${users.getCurrentUser?.tag}`)" />
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
}
</style>