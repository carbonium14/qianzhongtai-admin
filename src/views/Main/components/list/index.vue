<template>
  <div>
    <Infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
      <WaterFall :data="pexelsList" nodeKey="id" :column="isMobileTerminal ? 2: 5" :picturePreReading="false" class="px-1 w-full">
        <template v-slot="{ item, width }">
          <Item :data="item" :width="width" @click="onToPins"></Item>
        </template>
      </WaterFall>
    </Infinite>
    <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <Pins v-if="isVisiblePins" :id="currentPins.id"></Pins>
    </transition>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import { ref, watch } from 'vue'
import Item from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import Pins from '../../../Pins/components/Pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
const store = useStore()
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsData = async () => {
  if (isFinished.value) {
    return
  }
  if (pexelsList.value.length) {
    query.page += 1
  }
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
const loading = ref(false)
const isFinished = ref(false)
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  pexelsList.value = []
}
watch(() => store.getters.currentCategory, (currentCategory) => {
  resetQuery({
    page: 1,
    categoryId: currentCategory.id
  })
})
watch(() => store.getters.searchText, (val) => {
  resetQuery({
    page: 1,
    searchText: val
  })
})
const isVisiblePins = ref(false)
const currentPins = ref({})
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
const onToPins = (item) => {
  history.pushState(null, '', `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
</script>

<style lang="scss" scoped>

</style>