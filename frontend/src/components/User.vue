<script setup lang="ts">
import CalendarIcon from "./Icons/CalendarIcon.vue";
</script>

<template>
  <div class="user">
    <div class="username">Berk Cambaz</div>
    <div>@berkcambaz</div>
    <div class="bio">Hello, world!</div>
    <div class="date">
      <CalendarIcon />
      <span>January 2022</span>
    </div>
    <div class="follow-container">
      <span>
        <span class="followings">123 following</span>
        <span class="followers">123 followers</span>
      </span>
      <button class="follow-button">Follow</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  padding: 1rem 0;
  border-bottom: 1px solid #000000;
}

.username {
  font-size: $font-big;
}

.bio {
  padding: 0.5rem 0;
}

.date {
  display: flex;
  align-items: center;
}

.follow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 0.5rem;
}

.followers {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.followings {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}

.follow-button {
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  padding: 0.5rem 1.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
}
</style>