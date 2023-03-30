<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200
      xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
      <Navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">精选会员</Navbar>
      <div class="py-2 px-1">
        <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>
        <p class="text-center text-lg text-yellow-500">升级精选VIP, 畅想所有内容</p>
        <div class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200
          dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <PayMenuItem v-for="item in VIPPayListData" :key="item.id" :hot="item.isHot" :select="item.id === currentPayData.id"
            :data="item" @click="onChangeCurrentPay">
          </PayMenuItem>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        <Payment class="mt-4" :payData="currentPayData"></Payment>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getVIPPayList } from '@/api/pay'
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import PayMenuItem from './components/PayMenuItem/index.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Payment from './components/Payment/index.vue'
defineOptions({
  name: 'Member'
})
const router = useRouter()
const store = useStore()
const VIPPayListData = ref([])
const currentPayData = ref({})
const getVIPPayListData = async () => {
  const res = await getVIPPayList()
  VIPPayListData.value = res
  currentPayData.value = VIPPayListData.value[0]
}
getVIPPayListData()
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}
const onChangeCurrentPay = (item) => {
  currentPayData.value = item
}
</script>

<style lang="scss" scoped>

</style>