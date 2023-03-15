<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <li ref="silderTarget" :style="sliderStyle" class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"></li>
      <li @click="onShowPopup" class="fixed top-[0.05rem] right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
        <SvgIcon name="hamburger" class="w-1.5 h-1.5"></SvgIcon>
      </li>
      <li v-for="(item, index) in data" :key="item.id" :ref="setItemRef" @click="() => onItemClick(index)" 
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4" :class="{'text-zinc-100': currentCategoryIndex === index}">
        {{ item.name }}
      </li>
    </ul>
    <Popup v-model="isVisible">
      <Menu :categorys="data" @onItemClick="onItemClick"></Menu>
    </Popup>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import Menu from '@/views/Main/components/menu/index.vue'
defineProps({
  data: {
    type: Array,
    required: true
  }
})
const silderTarget = ref(null)
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})
const currentCategoryIndex = ref(0)
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  const ulPadding = parseInt(getComputedStyle(ulTarget.value, null).padding.slice(0, -2))
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - ulPadding}px)`,
    width: width + 'px'
  }
  if (isVisible.value) {
    isVisible.value = false
    ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft - ulPadding
  }
})
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
const isVisible = ref(false)
const onShowPopup = () => {
  isVisible.value = true
}
</script>

<style lang="scss" scoped>

</style>