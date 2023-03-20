<template>
  <div>
    <div v-for="(item, index) in hintData" :key="index" @click="() => onItemClick(item)" v-html="hightlightText(item)"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:bg-zinc-900">
    </div>
  </div>
</template>

<script setup>
import { getHint } from '@/api/pexels'
import { ref } from 'vue'
import { EMITS_ITEM_CLICK } from './constant'
import { watchDebounced } from '@vueuse/core'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_ITEM_CLICK])
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) {
    return
  }
  const { result } = await getHint(props.searchText)
  hintData.value = result
}
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
const hightlightText = (text) => {
  const hightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, hightlightStr)
}
</script>

<style lang="scss" scoped>

</style>