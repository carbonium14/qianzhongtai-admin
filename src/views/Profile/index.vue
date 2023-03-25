<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1">
    <div class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200
      xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2">
      <Navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">个人资料</Navbar>
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
          <div class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]" @click="onAvatarClick">
            <img v-lazy :src="$store.getters.userInfo.avatar" alt="图片" class="rounded-[50%] w-full h-full xl:inline-block"/>
            <div class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block">
              <SvgIcon name="change-header-image" class="w-2 h-2 m-auto mt-2"></SvgIcon>
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">点击更换头像</div>
            </div>
          </div>
          <input v-show="false" ref="inputFileTarget" type="file" accept=".png, .jpeg, .jpg, .gif" @change="onSelectImgHandler"/>
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">支持 jpg、png、jpeg 格式大小 5M 以内的图片</p>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
          <mInput v-model="userInfo.nickname" class="w-full" type="text" max="20"></mInput>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
          <mInput v-model="userInfo.title" class="w-full" type="text"></mInput>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
          <mInput v-model="userInfo.company" class="w-full" type="text"></mInput>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
          <mInput v-model="userInfo.homePage" class="w-full" type="text"></mInput>
        </div>
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
          <mInput v-model="userInfo.introduction" class="w-full" type="textarea" max="50"></mInput>
        </div>
        <Button class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onChangeProfile" :loading="loading">
          保存修改
        </Button>
        <Button v-if="isMobileTerminal" @click="onLogoutClick"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]">
          退出登录
        </Button>
      </div>
    </div>
    <Dialog title="裁剪头像" v-model="isDialogVisible" v-if="!isMobileTerminal">
      <ChangeAvatar :blob="currentBlob" @close="() => isDialogVisible = false"></ChangeAvatar>
    </Dialog>
    <Popup v-else v-model="isDialogVisible" :class="{ 'h-screen': isDialogVisible }">
      <ChangeAvatar :blob="currentBlob" @close="() => isDialogVisible = false"></ChangeAvatar>
    </Popup>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { confirm } from '@/libs'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { putProfile } from '@/api/sys'
import { message } from '@/libs/index'
import ChangeAvatar from './components/ChangeAvatar.vue'
defineOptions({
  name: 'Profile'
})
const store = useStore()
const router = useRouter()
const inputFileTarget = ref(null)
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
const isDialogVisible = ref(false)
const currentBlob = ref('')
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value.files[0]
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isDialogVisible.value = true
}
watch(isDialogVisible, (val) => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}
const userInfo = ref(store.getters.userInfo)
const loading = ref(false)
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
</script>

<style lang="scss" scoped>

</style>