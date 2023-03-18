<template>
  <div>
    <Infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
      <WaterFall :data="pexelsList" nodeKey="id" :column="isMobileTerminal ? 2: 5" :picturePreReading="false" class="px-1 w-full">
        <template v-slot="{ item, width }">
          <Item :data="item" :width="width"></Item>
        </template>
      </WaterFall>
    </Infinite>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import { ref } from 'vue'
import Item from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
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
</script>

<style lang="scss" scoped>

</style>