<script setup lang="ts">
import { i18n } from '@/util/i18n';

const { t } = i18n.global;
</script>

<template>
  <div class="error">{{ t("page_not_found") }}</div>
</template>

<style lang="scss" scoped>
.error {
  padding: 1rem 0;
}
</style>
  