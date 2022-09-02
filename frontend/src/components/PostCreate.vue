<script lang="ts" setup>
import { usePosts } from '@/stores/posts';
import { i18n } from '@/util/i18n';
import { ref } from 'vue';
import SendIcon from './Icons/SendIcon.vue';
import Input from './Input.vue';
import HoverMenu from './HoverMenu.vue';

const { show } = defineProps<{ show: boolean }>();
const { t } = i18n.global;
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
  <HoverMenu :show="show">
    <Input type="text" :text="text" class="input" :placeholder="t('post_create_text')" />
    <div class="bottom">
      <SendIcon class="icon" @click="postPost()" />
      <span>{{  `${text.current}/${text.limit}`  }}</span>
    </div>
  </HoverMenu>
</template>

<style lang="scss" scoped>
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