import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/index.scss'
import router from './router/index'
import { useRem } from './utils/flexible'
import mLibs from './libs/index'
import 'virtual:svg-icons-register'
import store from './store/index'
import useTheme from './utils/theme'
import Directives from './directives/index'
useRem()
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(Directives).mount('#app')
