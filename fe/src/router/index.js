import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: '사용자',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/user.vue')
    },
    {
      path: '/header',
      name: 'header',
      component: () => import('../views/header.vue'),
      // beforeEnter: authCheck
      beforeEnter: (to, from, next) => {
        console.log(to)
        console.log(from)
        if (!localStorage.getItem('token')) return next('block')
        next()
      }
    },
    {
      path: '/block',
      name: '차단',
      component: () => import('../views/block.vue')
    },
    {
      path: '/sign',
      name: '로그인',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/sign.vue')
    }
  ]
})
