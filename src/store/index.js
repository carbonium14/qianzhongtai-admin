import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search
  },
  plugins: [createPersistedState({
    key: 'qianzhongtai-front',
    paths: ['category', 'theme', 'search']
  })]
})
export default store