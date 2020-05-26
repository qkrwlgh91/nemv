import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Sign from '../views/sign.vue'

Vue.use(VueRouter)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
axios.defaults.headers.common.Authorization = localStorage.getItem('token')

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   config.headers.Authorization = localStorage.getItem('token')
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })
//
// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token)
//     this.$store.commit('getToken')
//   }
//   return response
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error)
// })

const pageCheck = (to, from, next) => {
// return next()
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      console.error(e.message)
      next(`/block/${e.message}`)
    })
}

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'lv0',
      component: () => import('../views/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('../views/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('../views/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('../views/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: '사용자',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/user.vue'),
      beforeEnter: pageCheck
    },
    {
      path: '/sign',
      name: '로그인',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Sign
    },
    {
      path: '/register',
      name: '회원가입',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/register')
    },
    {
      path: '/Home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      beforeEnter: pageCheck
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('../views/page'),
      beforeEnter: pageCheck
    },
    {
      path: '/site',
      name: '사이트',
      component: () => import('../views/site'),
      beforeEnter: pageCheck
    },
    // {
    //   path: '/header',
    //   name: 'header',
    //   component: () => import('../views/header.vue'),
    //   // beforeEnter: authCheck
    //   beforeEnter: (to, from, next) => {
    //     console.log(to)
    //     console.log(from)
    //     if (!localStorage.getItem('token')) return next('block')
    //     next()
    //   }
    {
      // 동적 라우트
      path: '/block/:msg',
      name: '차단',
      component: () => import('../views/block.vue')
    }
  ]
})
