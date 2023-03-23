<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMounseLeave">
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div v-show="isVisible" class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700" 
        ref="contentTarget" :style="contentStyle">
        <slot></slot>
      </div>  
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { PROP_TOP_LEFT, PROP_TOP_RIGHT, PROP_BOTTOM_LEFT, PROP_BOTTOM_RIGHT, placementEnum, DELAY_TIME } from './constant.js'
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error('输入位置必须是' + placementEnum.join(',') + '中的一个')
      }
      return result
    }
  }
})
let timeout= null
const onMouseEnter = () => {
  isVisible.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}
const onMounseLeave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false
    clearTimeout(timeout)
  }, DELAY_TIME)
}
const isVisible = ref(false)
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) {
    return {}
  }
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
const contentStyle = ref({
  top: 0,
  left: 0
})
watch(isVisible, (val) => {
  if (!val) {
    return
  }
  nextTick(() => {
    if (contentTarget.value.children.length === 0) {
      contentStyle.value = {}
      contentStyle.value.display = 'none'
      return
    }
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>