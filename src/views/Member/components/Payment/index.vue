<template>
  <div>
    <PCPayment v-if="!isMobileTerminal"></PCPayment>
    <MobilePayment v-else></MobilePayment>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PCPayment from './PCPayment/index.vue'
import MobilePayment from './MobliePayment/index.vue'
</script>

<style lang="scss" scoped>

</style>