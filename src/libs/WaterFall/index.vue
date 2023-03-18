<template>
  <div class="relative" ref="containerTarget" :style="{ height: containerHeight + 'px' }">
    <template v-if="columnWidth && data.length">
      <div class="m-waterfall-item absolute duration-300" v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index"
        :style="{ width: columnWidth + 'px', left: item._style?.left + 'px', top: item._style?.top + 'px' }">
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { getImgElements, getAllImg, onCompleteImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  nodeKey: {
    type: String
  },
  column: {
    default: 2,
    type: Number
  },
  columnSpacing: {
    default: 20,
    type: Number
  },
  rowSpacing: {
    default: 20,
    type: Number
  },
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
const containerHeight = ref(0)
const columnHeightObj = ref({})
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
const containerTarget = ref(null)
const containerWidth = ref(0)
const containerLeft = ref(0)
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
const columnWidth = ref(0)
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
  useColumnWidth()
})
let itemHeights = []
const waitImgComplete = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  onCompleteImgs(allImgs).then(() => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    useItemLocation()
  })
}
const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  useItemLocation()
}
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    increasingHeight(index)
  })
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
const getItemLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}
const increasingHeight = (index) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}
watch(() => props.data, (newVal) => {
  const resetColumnHeight = newVal.every((item) => !item._style)
  if (resetColumnHeight) {
    useColumnHeightObj()
  }
  nextTick(() => {
    if (props.picturePreReading) {
      waitImgComplete()
    } else {
      useItemHeight()
    }
  })
}, {
  deep: true,
  immediate: true
})
const reset = () => {
  setTimeout(() => {
    useColumnWidth()
    props.data.forEach((item) => item._style = null)
  }, 200)
}
watch(() => props.column , () => {
  if (props.picturePreReading) {
    columnWidth.value = 0
    reset()
  } else {
    reset()
  }
})
</script>

<style lang="scss" scoped>

</style>