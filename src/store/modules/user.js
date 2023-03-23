import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import { message } from '@/libs/index'
export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message('success', `欢迎您, ${data.vipLevel ? `尊贵的VIP${data.vipLevel}用户 ${data.nickname}` : data.nickname}`, 6000)
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      location.reload()
    },
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    }
  }
}