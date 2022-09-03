<script setup lang="ts">
import { useApp } from "@/stores/app";
import { i18n, setI18nLanguage } from "@/util/i18n";
import { createLoader } from "@/util/loader";
import CheckIcon from "../components/Icons/CheckIcon.vue";

const app = useApp();
const loader = createLoader();

const changeLanguage = async (lang: (Parameters<typeof setI18nLanguage>)[0]) => {
  if (chosenLanguage(lang)) return;
  app.initialLoad = "waiting";
  app.loading = "waiting";
  await loader.value.wait(setI18nLanguage(lang));
  app.initialLoad = "done";
  app.loading = "done";
}

const chosenLanguage = (lang: (Parameters<typeof setI18nLanguage>)[0]) => {
  return i18n.global.locale.value === lang;
}
</script>

<template>
  <div class="menu">
    <div class="item" @click="changeLanguage('en')">
      <CheckIcon class="icon" :class="{ hidden: !chosenLanguage('en') }" />
      <img src="@/assets/lang/usa.svg" class="img">
    </div>
    <div class="item" @click="changeLanguage('tr')">
      <CheckIcon class="icon" :class="{ hidden: !chosenLanguage('tr') }" />
      <img src="@/assets/lang/turkey.svg" class="img">
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

  .icon {
    margin-right: 1rem;

    &.hidden {
      visibility: hidden;
    }
  }

  .img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
  