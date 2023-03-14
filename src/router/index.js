import { createWebHistory, createRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import MobileRoutes from './modules/mobile-routes'
import PCRoutes from './modules/pc-routes'
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? MobileRoutes : PCRoutes
})
export default router