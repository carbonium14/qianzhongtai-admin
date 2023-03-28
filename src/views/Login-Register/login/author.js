import store from '@/store'
import router from '@/router'
import { message } from '@/libs'
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from '@/constants/index'
export const authorLogin = async (authorType, authorData) => {
  const code = await store.dispatch('user/login', {
    loginType: authorType,
    ...authorData
  })
  if (code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
    message('success', `欢迎您${authorData.nickname}, 请创建您的账号`, 6000)
    router.push({
      path: '/register',
      query: {
        reqType: authorType,
        ...authorData
      }
    })
    return
  }
  router.push('/')
}