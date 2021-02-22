<template>
  <div>
    <h1>商品详情页</h1>
    <p>{{$route.params.id}}</p>
  </div>
</template>

<script>
  export default {
    // 响应路由参数变化
    // 如果不这样监听，那么在多个之间切换的时候，组件为了考虑性能，是不会进行销毁重建的，也就是说在下面mounted或者created都不会再触发
    watch: {
      $route: {
        immediate: true,
        // deep: true,
        handler() {
          console.log('通过id去获取详情');
        }
      }
    },
    mounted () {
      console.log(this.$route.params.id);
    },
    created () {
      console.log('发起请求');
    },
  }
</script>

<style lang="scss" scoped>

</style>