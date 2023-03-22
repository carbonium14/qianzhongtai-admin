<template>
  <div class="w-full guide-search">
    <Search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <Hint :search-text="inputValue" v-show="inputValue" @item-click="onSearchHandler"></Hint>
          <History v-show="!inputValue" @item-click="onSearchHandler"></History>
          <Theme v-show="!inputValue"></Theme>
        </div>
      </template>
    </Search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hint from './Hint.vue'
import History from './History.vue'
import { useStore } from 'vuex'
import Theme from './Theme.vue'
const store = useStore()
const inputValue = ref('')
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    store.commit('search/addHistory', val)
    store.commit('app/changeSearchText', val)
  }
}
</script>

<style lang="scss" scoped>

</style>