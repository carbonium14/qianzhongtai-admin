import { defineAsyncComponent } from 'vue'
export { confirm } from './Confirm/index.js'
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for(const [fullPath, fn] of Object.entries(components)) {
      const componentName = fullPath.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}