<script lang="ts" setup>
import HeartIcon from "./Icons/HeartIcon.vue";
import BookmarkIcon from "./Icons/BookmarkIcon.vue";
</script>

<template>
  <div class="post">
    <div class="top">
      <span class="user-info">
        <span class="username">Berk Cambaz</span>
        <span class="usertag">@berkcambaz</span>
      </span>
      <span class="date">16h</span>
    </div>
    <div class="mid">
      Hello, world!
    </div>
    <div class="bottom">
      <span>123</span>
      <HeartIcon class="icon" />
      <BookmarkIcon class="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  &:last-child {
    border-bottom: 0;
  }

  padding: 1rem 0;
  border-bottom: 1px solid #000000;
}

.top {}

.mid {
  padding: 0.5rem 0 0.25rem 1rem;
}

.bottom {
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.user-info {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.username {}

.usertag {
  padding: 0 0.25rem;
}

.date {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.icon {
  cursor: pointer;
}
</style>