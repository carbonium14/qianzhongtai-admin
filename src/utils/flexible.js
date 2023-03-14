import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants/index'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})