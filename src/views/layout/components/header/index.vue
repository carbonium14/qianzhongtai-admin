<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800  dark:border-b-zinc-700 duration-500">
    <div class="flex items-center">
      <img v-lazy class="h-4 cursor-pointer mr-2 guide-home" @click="onToHome" :src="img" alt="图片">
      <HeaderSearch class="mr-1"></HeaderSearch>
      <HeaderTheme class="mr-1"></HeaderTheme>
      <HeaderMy></HeaderMy>
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './HeaderTheme.vue'
import HeaderMy from './HeaderMy.vue'
import { useRouter } from 'vue-router'
import img from '@/assets/vue.svg'
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>

</style>