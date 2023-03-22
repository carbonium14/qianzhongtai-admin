<template>
  <transition name="down">
    <div class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border
      cursor-pointer" :class="styles[type].containerClass" v-show="isVisible">
      <SvgIcon :name="styles[type].icon" :fillClass="styles[type].fillClass" class="h-1.5 w-1.5 mr-1.5"></SvgIcon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script setup>
import { typeEnum } from './constant'
import { ref, onMounted } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        return new Error(`你的type必须是${typeEnum.join(',')}中的一种`)
      }
      return result
    }
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  destory: {
    type: Function
  }
})
const styles = {
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
const isVisible = ref(false)
const animDuration = '0.5s'
onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      props.destory()
    }, parseInt(animDuration.replace('0.', '').replace('s', '')) * 100)
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>