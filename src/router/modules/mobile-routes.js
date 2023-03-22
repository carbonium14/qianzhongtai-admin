export default [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/Main/index.vue')
}, {
  path: '/pins/:id',
  name: 'Pins',
  component: () => import('@/views/Pins/index.vue')
}]