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
// axios.defaults.headers.common.Authorization = localStorage.getItem('token')

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const token = response.data.token
  console.log(token)
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
// return next()
  // axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
  axios.post('page', { name: to.path })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      console.error(e.message)
      // next(`/block/${e.message}`)
      next(`/block/${e.message.replace(/\//gi, ' ')}`)
    })
}

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'boardAnyone',
      component: () => import('../views/board/anyone'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv0',
      name: 'testLv0',
      component: () => import('../views/test/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv1',
      name: 'testLv1',
      component: () => import('../views//test/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv2',
      name: 'testLv2',
      component: () => import('../views//test/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv3',
      name: 'testLv3',
      component: () => import('../views/test/lv3'),
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
      path: '/manage/page',
      name: 'manage페이지',
      component: () => import('../views/manage/page'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/site',
      name: 'manage사이트',
      component: () => import('../views/manage/site'),
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
    },
    {
      path: '/manage/users',
      name: 'manageUsers',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/manage/users.vue'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/boards',
      name: 'manageBoards',
      component: () => import('../views/manage/boards.vue'),
      beforeEnter: pageCheck
    }
  ]
})
