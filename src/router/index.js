import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // 放到Login中，当登录成功之后动态添加路由
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 使用webpack+vue提供的异步组件的方式实现懒加载
  //   // 代码将来会分割出去成一个独立的chunk（分片的模式）
  //   // 只有进入到这个路由，才会实时的去下载这个组件，因为打包的时候是单独打包出去的，这样加载时间会变短
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //   children: [
  //     {
  //       path: 'detail/:id',
  //       name: 'Detail',
  //       component: () => import('../views/Detail.vue')
  //     }
  //   ],
  //   beforeEnter(to, from, next) {
  //     // 是否登录
  //     if (window.isLogin) { // 假如在全局保存了一个变量isLogin，用来判断是否登陆
  //       next() // 放行
  //     } else {
  //       next('/login?redirect=' + to.fullPath) // 跳转到登陆，然后登陆成功之后重定向到想去的 页面
  //     }
  //   }
  // },
  {
    // :id标示动态路由
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    // 会匹配所有路径
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => { 
// 	xxx代码 
// 	// to: Route: 即将要进入的目标 路由对象 
// 	// from: Route: 当前导航正要离开的路由 
// 	// next: Function: 一定要调用该方法来 resolve 这个钩子。 
// })
// 全局守卫
// router.beforeEach((to, from, next) => {
//   // 判断路由是否需要守卫
//   // meta数据
//   if (to.meta.auth) {
//     // 是否登录
//     if (window.isLogin) { // 假如在全局保存了一个变量isLogin，用来判断是否登陆
//       next() // 放行
//     } else {
//       next('/login?redirect='+to.fullPath) // 跳转到登陆，然后登陆成功之后重定向到想去的 页面
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  // 已登录
  if (window.isLogin) {
    if (to.path === '/login') {
      // 已登录没必要去登录页，重定向至首页
      next('/')
    } else {
      // 去其他页放行
      next()
    }
  } else {
    // 没有登录
    if (to.path === '/login') {
      // 要去登录页就直接放行
      next()
    } else {
      // 否则重定向到登录页
      next('/login?redirect=' + to.fullPath)
    }
  }
})
export default router
