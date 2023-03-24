<template>
  <div class="hidden pt-5 h-8 xl:block">
    <img v-lazy class="m-auto" :src="img" alt="图片"/>
  </div>
  <div class="h-[111px] xl:hidden">
    <img v-lazy class="dark:hidden" src="https://res.lgdsunday.club/login-bg.png" alt="图片"/>
    <img v-lazy class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]" :src="img" alt="图片"/>
  </div>
</template>

<script setup>
import img from '@/assets/vue.svg'
</script>

<style lang="scss" scoped>

</style>