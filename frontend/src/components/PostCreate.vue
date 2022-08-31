<script lang="ts" setup>
import { usePosts } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import SendIcon from './Icons/SendIcon.vue';
import Input from './Input.vue';

const posts = usePosts();

const text = ref({
  limit: 256,
  current: 0,
  value: "",
  type: "multi" as const
});

const postPost = () => {
  if (text.value.value.length > text.value.limit) return;
  posts.post(text.value.value);
  text.value.current = 0;
  text.value.value = "";
}
</script>

<template>
  <div class="post-create">
    <Input type="text" :text="text" class="input" placeholder="Write your thoughts..." />
    <div class="bottom">
      <SendIcon class="icon" @click="postPost()" />
      <span>{{  `${text.current}/${text.limit}`  }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-create {
  padding: 1.5rem 0;
}

.input {
  width: 100%;
}

.bottom {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
}
</style>