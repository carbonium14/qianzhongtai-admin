import { h, render } from 'vue'
import ConfirmComponent from './index.vue'
export const confirm = (title, content, cancalText, confirmText) => {
  return new Promise((reslove, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    const close = () => {
      render(null, document.body)
    }
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }
    const confirmHandler = () => {
      reslove()
    }
    const vNode = h(ConfirmComponent, {
      title,
      content,
      cancalText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    render(vNode, document.body)
  })
}