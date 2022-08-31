<script lang="ts" setup>
import { createLoader } from '@/util/loader';
import { onMounted, onUnmounted } from 'vue';
import Loader from './Loader.vue';

const { onInit, onTop, onBottom } = defineProps<{
  onInit: () => Promise<any>,
  onTop: () => Promise<any>,
  onBottom: () => Promise<any>,
}>();

const midLoader = createLoader();
const topLoader = createLoader();
const bottomLoader = createLoader();
let loading = false;

midLoader.value.wait(onInit());

const onScroll = async (ev: Event) => {
  if (loading) return;
  loading = true;

  if (window.scrollY <= 0) {
    await topLoader.value.wait(onTop());
  }

  else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    await bottomLoader.value.wait(onBottom());
    window.scrollTo(0, window.scrollY - 1);
  }

  loading = false;
}

onMounted(() => { window.addEventListener("scroll", onScroll) })
onUnmounted(() => { window.removeEventListener("scroll", onScroll) })
</script>
  
<template>
  <div>
    <Loader v-if="topLoader.status" class="loader top" />
    <Loader v-if="midLoader.status" class="loader mid" />
    <slot v-if="!midLoader.status"></slot>
    <Loader v-if="bottomLoader.status" class="loader bottom" />
  </div>
</template>


<style lang="scss" scoped>
.loader {
  margin: 1rem 0;
}
</style>