<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1 dark:text-zinc-200">所有分类</h2>
    <ul class="overflow-y-scroll" ref="ulTarget">
      <li v-for="(item, index) in $store.getters.categorys" :key="item.id" @click="$emit('onItemClick', index)"
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
defineEmits(['onItemClick'])
const ulTarget = ref(null)
onMounted(() => {
    useEventListener(ulTarget, 'touchmove', (event) => {
        event.stopPropagation()
    })
})
</script>

<style lang="scss" scoped>

</style>