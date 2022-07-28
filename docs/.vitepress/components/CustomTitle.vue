<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div :style="{ '--title': `'${title}'` }">
    <slot />
  </div>
</template>

<style scoped>
div :deep([class*='language-']:before) {
  content: var(--title);
}
</style>
