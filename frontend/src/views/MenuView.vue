<script setup lang="ts">
import LogoutIcon from "../components/Icons/LogoutIcon.vue";
import InfoIcon from "../components/Icons/InfoIcon.vue";
import BookmarkIcon from "../components/Icons/BookmarkIcon.vue";
import LanguageIcon from "../components/Icons/LanguageIcon.vue";
import UserIcon from "../components/Icons/UserIcon.vue";
import { useUsers } from "@/stores/users";
import router from "@/router";
import { i18n } from "@/util/i18n";

const { t } = i18n.global;
const users = useUsers();

const account = () => {
  router.push("/account");
}

const bookmarks = () => {
  router.push("/bookmarks");
}

const languages = () => {
  router.push("/languages");
}

const about = () => {
  router.push("/about");
}

const logout = () => {
  users.logout();
}
</script>

<template>
  <div class="menu">
    <div class="item" v-if="users.current !== null" @click="account()">
      <UserIcon /><span class="text">{{t("account")}}</span>
    </div>
    <div class="item" v-if="users.current !== null" @click="bookmarks()">
      <BookmarkIcon /><span class="text">{{t("bookmarks")}}</span>
    </div>
    <div class="item" @click="languages()">
      <LanguageIcon /><span class="text">{{t("languages")}}</span>
    </div>
    <div class="item" @click="about()">
      <InfoIcon /><span class="text">{{t("about")}}</span>
    </div>
    <div class="item" v-if="users.current !== null" @click="logout()">
      <LogoutIcon /><span class="text">{{t("logout")}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center;
  width: 100%;

  cursor: pointer;

  padding: 0.75rem;
  border-bottom: 1px solid #000000;

  &:last-child {
    border-bottom: 0;
  }

  .text {
    margin-left: 1rem;
    font-size: $font-medium-big;
  }
}
</style>
