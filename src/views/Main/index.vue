<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent
   xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent" ref="containerTarget">
    <Navigation></Navigation>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List></List>
    </div>
    <TriggerMenu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <TriggerMenuItem icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">首页</TriggerMenuItem>
      <TriggerMenuItem icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500" v-if="$store.getters.token"
        textClass="text-zinc-400 dark:text-zinc-500" @click="onVIPClick">
        VIP
      </TriggerMenuItem>
      <TriggerMenuItem icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick">
        {{ $store.getters.token ? '我的' : '去登录' }}
      </TriggerMenuItem>
    </TriggerMenu>
  </div>
</template>

<script setup>
import Navigation from './components/navigation/index.vue'
import List from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'
defineOptions({
  name: 'Home'
})
const store = useStore()
const router = useRouter()
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
const onVIPClick = () => {

}
const onMyClick = () => {
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>

</style>