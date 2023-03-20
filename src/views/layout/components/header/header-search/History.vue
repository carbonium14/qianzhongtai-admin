<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <SvgIcon name="delete" class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400" @click="onDeleteAllClick">
      </SvgIcon>
    </div>
    <div class="flex flex-wrap">
      <div v-for="(item, index) in $store.getters.historys" :key="index" @click="() => onItemClick(item)"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold 
        rounded-sm duration-300 hover:bg-zinc-200">
        <span>{{ item }}</span>
        <SvgIcon name="input-delete" class="w-2.5 h-2.5 p-0.5 ml-1 hover:bg-zinc-100 rounded-sm duration-300"
          @click.stop="() => onDeleteClick(index)">
        </SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { EMITS_ITEM_CLICK } from './constant'
import { confirm } from '@/libs'
const emits = defineEmits([EMITS_ITEM_CLICK])
const store = useStore()
const onDeleteAllClick = () => {
  confirm('提示', '要删除所有记录吗?', '取消', '确定').then(() => {
    store.commit('search/deleteAllHistory')
  }).catch(() => {

  })
}
const onDeleteClick = (index) => {
  store.commit('search/deleteHistory', index)
}
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>

<style lang="scss" scoped>

</style>