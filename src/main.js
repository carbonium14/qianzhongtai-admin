import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/index.scss'
import router from '@/router/index'
import { useRem } from '@/utils/flexible'
import mLibs from '@/libs/index'
import 'virtual:svg-icons-register'
useRem()
createApp(App).use(router).use(mLibs).mount('#app')
