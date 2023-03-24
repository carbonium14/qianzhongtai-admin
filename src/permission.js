import router from './router/index'
import store from './store/index'
import { message } from './libs/index'
router.beforeEach((to, from) => {
  if (!to.meta.user) {
    return
  }
  if (store.getters.token) {
    return true
  }
  message('warn', '登录失效,请重新登录')
  return '/'
})