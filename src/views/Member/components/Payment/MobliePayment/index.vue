<template>
  <div class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden">
    <Discounts></Discounts>
    <div class="flex justify-between text-xs px-1 py-0.5">
      <div class="text-left text-zinc-900 dark:text-zinc-200">
        <p class="">
          券后合计：
          <span class="text-red-600 text-[16px] font-sans font-medium">￥</span>
          <span class="text-red-600 text-[22px] font-sans font-medium">9</span>
        </p>
        <p class="text-red-600">优惠券：限时立减 ￥10</p>
      </div>
      <Button class="w-[120px]" :isActiveAnim="false" @click="onConfirmClick">立即开通</Button>
    </div>
    <Popup v-model="isOpenPopup" class="rounded">
      <MobilePaySelect :pay-data="payData"></MobilePaySelect>
    </Popup>
  </div>
</template>

<script setup>
import Discounts from '../Discounts.vue'
import { ref } from 'vue'
import MobilePaySelect from './MobilePaySelect.vue'
defineProps({
  payData: {
    type: Object
  }
})
const isOpenPopup = ref(false)
const onConfirmClick = () => {
  isOpenPopup.value = !isOpenPopup.value
}
</script>

<style lang="scss" scoped>

</style>