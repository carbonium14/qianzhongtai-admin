<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <Header></Header>
    <div class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4
      xl:rounded-sm xl:shadow-lg">
      <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">注册账号</h3>
      <VeeForm @submit="onRegHandler">
        <VeeField class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1
          text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" name="username" type="text"
          placeholder="用户名" autocomplete="on" :rules="validateUsername" v-model="regForm.username"/>
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="username"></VeeErrorMessage>
        <VeeField class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1
          text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" name="password" type="password"
          placeholder="密码" autocomplete="on" :rules="validatePassword" v-model="regForm.password"/>
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="password"></VeeErrorMessage>
        <VeeField class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1
          text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" name="confirmPassword"
          type="password" placeholder="确认密码" autocomplete="on" rules="validateConfirmPassword:@password"
          v-model="regForm.confirmPassword"/>
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="confirmPassword"></VeeErrorMessage>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <a class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600
              dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer" target="__black" @click="onToLogin">
              去登录
            </a>
          </div>
          <div class="text-center">
            <a class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400
              cursor-pointer" target="__black">
              注册即同意《注册协议》
            </a>
          </div>
        </div>
        <Button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800" :isActiveAnim="false" :loading="loading">立即注册</Button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/header.vue'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage, defineRule } from 'vee-validate'
import { validateUsername, validatePassword, validateConfirmPassword } from '../validate'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants/index'
import { message } from '@/libs'
defineOptions({
  name: 'Register'
})
const store = useStore()
const router = useRouter()
const route = useRoute()
defineRule('validateConfirmPassword', validateConfirmPassword)
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
const loading = ref(false)
const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const onRegHandler = () => {
  loading.value = true
  try {
    const payload = {
      username: regForm.value.username,
      password: regForm.value.password
    }
    store.dispatch('user/register', {
      ...payload,
      ...route.query
    })
    store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
  } catch (error) {
    message('error', error)
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<style lang="scss" scoped>

</style>