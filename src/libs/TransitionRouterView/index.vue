<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
      <keep-alive :include="virtualTaskStack">
        <component :is="Component" :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }" :key="$route.fullPath"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { NONE, ROUTER_TYPE_ENUM, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK } from './constant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const props = defineProps({
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val)
      if (!result) {
        throw new Error(`你的routerType必须是${ROUTER_TYPE_ENUM.join(',')}中的一个`)
      }
      return result
    }
  },
  mainComponentName: {
    type: String,
    required: true
  }
})
const router = useRouter()
const transitionName = ref('')
const virtualTaskStack = ref([props.mainComponentName])
router.beforeEach((to, from) => {
  transitionName.value = props.routerType
  if (props.routerType === ROUTER_TYPE_PUSH) {
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    virtualTaskStack.value.pop()
  }
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>

<style lang="scss" scoped>
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
