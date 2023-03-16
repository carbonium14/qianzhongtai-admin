<template>
  <div class="w-full">
    <Search v-model="inputValue">
      <template #dropdown>
        123
      </template>
    </Search>
  </div>
</template>

<script setup>
import Search from '@/libs/Search/index.vue'
import { ref } from 'vue'
const inputValue = ref('')
</script>

<style lang="scss" scoped>

</style>