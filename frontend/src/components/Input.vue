<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const { text } = defineProps<{
  text: { type: "single" | "multi", limit: number, current: number, value: string }
}>();

const singleInput = ref<HTMLInputElement | null>(null);
const multiInput = ref<HTMLInputElement | null>(null);

const onInput = () => {
  let value = "";
  if (text.type === "single" && singleInput.value) value = singleInput.value.value;
  else if (text.type === "multi" && multiInput.value) value = multiInput.value.value;
  else return;

  text.current = value.length;
  text.value = value;

  if (text.type === "multi" && multiInput.value) {
    const elem = multiInput.value;
    elem.style.height = "0";
    elem.style.height = elem.scrollHeight + "px";
  }
}

const getMultilineText = () => {
  if (multiInput.value) multiInput.value.value = text.value;
  onInput();
  return text.value;
}

onMounted(() => { onInput(); })
</script>

<template>
  <input v-if="text.type === 'single'" ref="singleInput" @input="onInput()" class="input-single" :value="text.value">
  <textarea v-else ref="multiInput" @input="onInput()" class="input-multi">{{   getMultilineText()   }}</textarea>
</template>

<style lang="scss" scoped>
.input-single {
  box-sizing: content-box;

  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
}

.input-multi {
  box-sizing: content-box;

  overflow: hidden;
  resize: none;
  border: 0;
  outline: 0;
  border-radius: 0;

  border-bottom: 1px solid #000000;
}
</style>