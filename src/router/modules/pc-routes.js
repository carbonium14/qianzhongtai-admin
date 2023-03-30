export default [{
  path: '/',
  name: 'Main',
  component: () => import('@/views/layout/index.vue'),
  children: [{
    path: '',
    name: 'Home',
    component: () => import('@/views/Main/index.vue')
  }, {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/index.vue'),
    meta: {
      user: true
    }
  }, {
    path: '/member',
    name: 'Member',
    component: () => import('@/views/Member/index.vue'),
    meta: {
      user: true
    }
  }, {
    path: '/pay/result',
    name: 'payResult',
    component: () => import('@/views/Pay/index.vue'),
    meta: {
      user: true
    }
  }]
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