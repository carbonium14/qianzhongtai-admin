<template>
  <div>
    <PCPayment v-if="!isMobileTerminal" :pay-data="payData"></PCPayment>
    <MobilePayment v-else :pay-data="payData"></MobilePayment>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PCPayment from './PCPayment/index.vue'
import MobilePayment from './MobliePayment/index.vue'
defineProps({
  payData: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>

</style>