import { h, render } from 'vue'
import Message from './index.vue'
export const message = (type, content, duration = 3000) => {
  const onDestory = () => {
    render(null, document.body)
  }
  const vNode = h(Message, {
    type,
    content,
    duration,
    destory: onDestory
  })
  render(vNode, document.body)
}