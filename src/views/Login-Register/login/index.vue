<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <Header></Header>
    <div class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8
      xl:py-4 xl:rounded-sm xl:shadow-lg">
      <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">账号登录</h3>
      <VeeForm @submit="onLoginHandler">
        <VeeField class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1
          text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" name="username" type="text"
          placeholder="用户名" autocomplete="on" :rules="validateUsername" v-model="loginForm.username"/>
        <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="username"></VeeErrorMessage>
        <VeeField class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1
          text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" name="password" type="password"
          placeholder="密码" autocomplete="on" :rules="validatePassword" v-model="loginForm.password"/>
          <VeeErrorMessage class="text-sm text-red-600 block mt-0.5 text-left" name="password"></VeeErrorMessage>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600
            dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer" @click="onToReg">
            去注册
          </a>
        </div>
        <Button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800" :isActiveAnim="false" :loading="loading">登录</Button>
      </VeeForm>
      <div class="flex justify-around mt-4">
        <QQLogin></QQLogin>
        <WeixinLogin></WeixinLogin>
      </div>
      <SliderCaptcha v-if="isSliderCaptchaVisible" @close="() => isSliderCaptchaVisible = false" @success="onCaptchaSuccess"></SliderCaptcha>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import SliderCaptcha from './SliderCaptcha.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants/index'
import { useRouter } from 'vue-router'
import { message } from '@/libs'
import QQLogin from './QQLogin.vue'
import WeixinLogin from './WeixinLogin.vue'
defineOptions({
  name: 'Login'
})
const store = useStore()
const router = useRouter()
const isSliderCaptchaVisible = ref(false)
const loading = ref(false)
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false
  onLogin()
}
const loginForm = ref({
  username: '',
  password: ''
})
const onLogin = () => {
  loading.value = true
  try {
    store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } catch(error) {
    message('error', error)
  } finally {
    loading.value = false
  }
  router.push('/')
}
const onToReg = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}
</script>

<style lang="scss" scoped>

</style>