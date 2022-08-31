<script setup lang="ts">
import LogoutIcon from "../components/Icons/LogoutIcon.vue";
import InfoIcon from "../components/Icons/InfoIcon.vue";
import BookmarkIcon from "../components/Icons/BookmarkIcon.vue";
import LanguageIcon from "../components/Icons/LanguageIcon.vue";
import UserIcon from "../components/Icons/UserIcon.vue";
</script>

<template>
  <div class="menu">
    <div class="item">
      <UserIcon /><span class="text">account</span>
    </div>
    <div class="item">
      <BookmarkIcon /><span class="text">bookmarks</span>
    </div>
    <div class="item">
      <LanguageIcon /><span class="text">languages</span>
    </div>
    <div class="item">
      <InfoIcon /><span class="text">about</span>
    </div>
    <div class="item">
      <LogoutIcon /><span class="text">logout</span>
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
