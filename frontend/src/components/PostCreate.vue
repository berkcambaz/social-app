<script lang="ts" setup>
import { usePosts } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import SendIcon from './Icons/SendIcon.vue';

const posts = usePosts();

const contentInput = ref<HTMLInputElement | null>(null);
const text = ref({
  limit: 256,
  current: 0
}).value;

const onInput = () => {
  const elem = contentInput.value;
  if (!elem) return;
  if (elem.value.length > text.limit) elem.value = elem.value.substring(0, text.limit);
  text.current = elem.value.length;
  elem.style.height = "0";
  elem.style.height = elem.scrollHeight + "px";
}

const postPost = () => {
  const elem = contentInput.value;
  if (!elem) return;
  posts.post(elem.value);
  elem.value = "";
  onInput();
}

onMounted(() => { onInput(); })
</script>

<template>
  <div class="post-create">
    <textarea class="input" ref="contentInput" placeholder="Write your thoughts..." @input="onInput"></textarea>
    <div class="bottom">
      <SendIcon class="icon" @click="postPost()" />
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