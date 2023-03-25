<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>


<script setup>
import { EMITS_FINISH, EMITS_CHANGE, INTERVAL_COUNT } from './constant'
import { ref, watch, onUnmounted, computed } from 'vue'
import dayjs from './utils'
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])
const duration = ref(0)
let interval = null
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT);
}
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
onUnmounted(() => {
  close()
})
watch(() => props.time, (val) => {
  duration.value = val
  start()
}, {
  immediate: true
})
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>

<style lang="scss" scoped>

</style>