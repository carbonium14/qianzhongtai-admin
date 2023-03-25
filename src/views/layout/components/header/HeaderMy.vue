<template>
  <Popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none 
        hover:bg-zinc-100/60 dark:hover:bg-zinc-900" v-if="$store.getters.token">
        <img v-lazy class="w-3 h-3 rounded-sm" :src="$store.getters.userInfo.avatar" alt="图片">
        <SvgIcon class="h-1.5 w-1.5 ml-0.5" name="down-arrow" fillClass="fill-zinc-900"></SvgIcon>
        <SvgIcon class="h-1.5 w-1.5 absolute right-[16px] bottom-0" name="vip" fillClass="fill-zinc-900 dark:fill-zinc-300"
          v-if="$store.getters.userInfo.vipLevel">
        </SvgIcon>
      </div>
      <div class="guide-my" v-else>
        <Button icon="profile" iconColor="#fff" @click="onToLogin"></Button>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden" v-if="$store.getters.token">
      <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr" :key="item.id" @click="() => onItemClick(item)">
        <SvgIcon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300"></SvgIcon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </Popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs/index'
const store = useStore()
const router = useRouter()
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
const onItemClick = (item) => {
  if (item.id === 2) {
    confirm('提示', '确定要退出登录吗?').then(() => {
      store.dispatch('user/logout')
    })
  } else if (item.id === 0) {
    store.commit('app/changeRouterType', 'push')
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>

</style>