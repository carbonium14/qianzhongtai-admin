<template>
  <button class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[typeEnum[type], sizeEnum[sizeKey].button, { 'active:scale-105' : isActiveAnim }]" @click.stop="onBtnClick">
    <SvgIcon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></SvgIcon>
    <SvgIcon v-if="icon" :name="icon" class="m-auto" :class="sizeEnum[sizeKey].icon" :color="iconColor" :fillClass="iconClass"></SvgIcon>
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { typeEnum, sizeEnum, EMITS_CLICK } from './constant'
const props = defineProps({
  icon: {
    type: String
  },
  iconColor: {
    type: String
  },
  iconClass: {
    type: String
  },
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error('输入type必须是' + keys.join(',') + '中的一个')
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error('输入size必须是' + keys.join(',') + '中的一个')
      }
      return result
    }
  },
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMITS_CLICK])
const sizeKey =computed(() => {
  return props.icon? 'icon-' + props.size : props.size
})
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits(EMITS_CLICK)
}
</script>

<style lang="scss" scoped>

</style>