<template>
  <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40" ref="containerTarget">
    <div>
      <SvgIcon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search" color="#707070"></SvgIcon>
      <input type="text" placeholder="搜索" v-model="inputValue" @keyup.enter="onSearchHandler" @focus="onFocusHandler" @blur="onBlurHandler"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide
        text-sm font-semibold border border-zinc-100 focus:border-red-300 duration-500 group-hover:bg-white
        group-hover:border-zinc-100">
      <SvgIcon class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-7 cursor-pointer duration-500"
        name="input-delete" v-show="inputValue" @click="onClearClick">
      </SvgIcon>
      <div class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 
      bg-zinc-200 group-hover:opacity-100">
      </div>
      <Button icon="search" iconColor="#ffffff" @click="onSearchHandler"
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100 duration-500">
      </Button>
    </div>
    <Transition name="slide">
      <div class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 
        rounded border border-zinc-200 duration-200 hover:shadow-2xl" v-if="$slots.dropdown" v-show="isFocus">
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Button from '../Button/index.vue'
import { useVModel, onClickOutside } from '@vueuse/core'
import { EMITS_UPDATE_MODELVALUE, EMIT_SEARCH, EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR } from './constant'
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_UPDATE_MODELVALUE, EMIT_SEARCH, EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])
const inputValue = useVModel(props)
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
const onSearchHandler = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>