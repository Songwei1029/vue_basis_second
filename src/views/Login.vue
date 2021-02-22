<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      window.isLogin = true;
      // 注意参数需要是数组对象，如果没有登录，那么就不会有这个路由
      this.$router.addRoutes([{
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // 使用webpack+vue提供的异步组件的方式实现懒加载
        // 代码将来会分割出去成一个独立的chunk（分片的模式）
        // 只有进入到这个路由，才会实时的去下载这个组件，因为打包的时候是单独打包出去的，这样加载时间会变短
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        children: [
          {
            path: "detail/:id",
            name: "Detail",
            component: () => import("../views/Detail.vue")
          }
        ],
        beforeEnter(to, from, next) {
          // 是否登录
          if (window.isLogin) {
            // 假如在全局保存了一个变量isLogin，用来判断是否登陆
            next(); // 放行
          } else {
            next("/login?redirect=" + to.fullPath); // 跳转到登陆，然后登陆成功之后重定向到想去的 页面
          }
        }
      }]);
      // 使用的是带查询参数，所以是获取query      
      this.$router.push(this.$route.query.redirect);
    }
  },
  computed: {
    isLogin() {
      return window.isLogin;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>