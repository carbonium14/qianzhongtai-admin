<template>
  <div class="overflow-auto flex flex-col items-center">
    <SvgIcon v-if="isMobileTerminal" name="close" class="w-3 h-3 p-0.5 m-1 ml-auto" fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close">
    </SvgIcon>
    <img class="" ref="imageTarget" :src="blob" />
    <Button class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick" :loading="loading">确定</Button>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { EMITS_CLOSE } from './constant'
import { ref, onMounted } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs/Message'
import { putProfile } from '@/api/sys'
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const store = useStore()
const mobileOptions = {
  viewMode: 1,
  dragMode: 'move',
  aspectRatio: 1,
  cropBoxMovable: false,
  cropBoxResizable: false
}
const pcOptions = {
  aspectRatio: 1
}
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  cropper = new Cropper(imageTarget.value, isMobileTerminal ? mobileOptions : pcOptions)
})
const loading = ref(false)
const emits = defineEmits([EMITS_CLOSE])
const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    putObjectToOSS(blob)
  })
}
let ossClient = null
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]}`
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
  } catch (error) {
    message('error', error)
  }
}
const onChangeProfile = async (avatar) => {
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  await putProfile(store.getters.userInfo)
  message('success', '图片上传成功')
  loading.value = false
  close()
}
const close = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped>

</style>