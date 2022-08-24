<script setup lang="ts">
</script>

<template>
  <div class="signup">
    <input type="text" class="input" placeholder="usertag...">
    <input type="password" class="input" placeholder="password...">
    <button class="button">login</button>
    <span class="text">i don't have an account</span>
  </div>
</template>

<style lang="scss" scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;

  >* {
    margin: 0.5rem 0;
  }
}

.input {
  box-sizing: content-box;

  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
}

.button {
  cursor: pointer;

  border: 0;
  border-radius: 5px;

  background-color: #000000;
  color: #ffffff;

  padding: 0.25rem 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
}

.text {
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #000000;
  }
}
</style>