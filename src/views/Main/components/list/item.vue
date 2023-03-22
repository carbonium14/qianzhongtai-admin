<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group" :style="{ backgroundColor: randomRGB() }" @click="onToPinsClick">
      <img v-lazy class="w-full rounded bg-transparent" :src="data.photo" alt="图片"
        :style="{ height: (width / data.photoWidth) * data.photoHeight + 'px'  }" ref="imgTarget">
      <div class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 
        group-hover:opacity-100 xl:block">
        <Button class="absolute top-1.5 left-1.5">分享</Button>
        <Button class="absolute top-1.5 right-1.5" type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200"></Button>
        <Button class="absolute bottom-1.5 left-1.5 bg-zinc-100/70" type="info" icon="download" size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onDownload">
        </Button>
        <Button class="absolute bottom-1.5 right-1.5 bg-zinc-100/70" type="info" icon="full" size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onImgFullScreen">
        </Button>
      </div>
    </div>
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">{{ data.title }}</p>
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="图片">
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useFullscreen, useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})
const emits = defineEmits(['click'])
const onDownload = () => {
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)
const { x: imgContainerX, y: imgContainerY, width: imgContainerWidth, height: imgContainerHeight } = useElementBounding(imgTarget)
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})
const onToPinsClick = () => {
  emits('click', {
    id: props.data.id,
    location: imgContainerCenter.value
  })
}
</script>

<style lang="scss" scoped>

</style>