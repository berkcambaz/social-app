<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SendIcon from './Icons/SendIcon.vue';

const input = ref<HTMLInputElement | null>(null);
const text = ref({
  limit: 256,
  current: 0
}).value;

const onInput = () => {
  const elem = input.value;
  if (!elem) return;
  if (elem.value.length > text.limit) elem.value = elem.value.substring(0, text.limit);
  text.current = elem.value.length;
  elem.style.height = "0";
  elem.style.height = elem.scrollHeight + "px";
}

onMounted(() => { onInput(); })
</script>

<template>
  <div class="post-create">
    <textarea class="input" ref="input" placeholder="Write your thoughts..." @input="onInput"></textarea>
    <div class="bottom">
      <SendIcon class="icon" />
      <span>{{ `${text.current}/${text.limit}` }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-create {
  padding: 1.5rem 0 0.5rem 0;
}

.input {
  box-sizing: content-box;
  width: 100%;

  overflow: hidden;
  resize: none;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
}

.bottom {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;

}
</style>