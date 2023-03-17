export default [{
  path: '/',
  name: 'Main',
  component: () => import('@/views/layout/index.vue'),
  children: [{
    path: '',
    name: 'Home',
    component: () => import('@/views/Main/index.vue')
  }]
}]