export default [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/Main/index.vue')
}, {
  path: '/pins/:id',
  name: 'Pins',
  component: () => import('@/views/Pins/index.vue')
}, {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login-Register/login/index.vue')
}, {
  path: '/register',
  name: 'Register',
  component: () => import('@/views/Login-Register/register/index.vue')
}]