<template>
  <div>
    <Mobile v-if="isMobileTerminal"></Mobile>
    <PC v-else></PC>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import Mobile from './mobile/index.vue'
import PC from './pc/index.vue'
</script>

<style lang="scss" scoped>

</style>