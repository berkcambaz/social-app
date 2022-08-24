<script lang="ts" setup>
import HomeIcon from "../Icons/HomeIcon.vue";
import SearchIcon from "../Icons/SearchIcon.vue";
import UserIcon from "../Icons/UserIcon.vue";
import SendIcon from "../Icons/SendIcon.vue";
</script>

<template>
  <div>
    <div class="container">
      <div class="content">
        <HomeIcon class="icon" />
        <SearchIcon class="icon" />
        <UserIcon class="icon" />
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