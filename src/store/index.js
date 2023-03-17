import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme'
const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [createPersistedState({
    key: 'qianzhongtai-front',
    paths: ['category', 'theme']
  })]
})
export default store