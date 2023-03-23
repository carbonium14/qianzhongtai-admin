<template>
  <div class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded
    border border-zinc-200 dark:border-zinc-900 shadow-3xl">
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <SvgIcon name="refresh" fillClass="fill-zinc-900 dark:fill-zinc-200" @click="onReset"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900">
      </SvgIcon>
      <SvgIcon name="close" fillClass="fill-zinc-900 dark:fill-zinc-200" @click="onClose"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900">
      </SvgIcon>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { onMounted } from 'vue'
import { message } from '@/libs'
import { getCaptcha } from '@/api/sys'
import { EMITS_CLOSE, EMITS_SUCCESS } from './constant'
const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    id: 'captcha',
    async onSuccess(arr) {
      const res = await getCaptcha({
        behavior: arr
      })
      if (res) {
        emits(EMITS_SUCCESS)
      }
    },
    onFail() {
      message('error', '验证失败!')
    },
    verify() {
      return true
    }
  })
})
const onReset = () => {
  captcha.reset()
}
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped>

</style>