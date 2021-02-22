<template>
  <div class="about">
    <h1>about</h1>
    <ul>
      <li v-for="item of goodsList" :key='item.id' @click="clickHandle(item)">
        {{item.name}} - {{item.price | symbol("$")}}
        <!-- <router-link :to='`/about/detail/${item.id}`'>
          {{item.name}} - {{item.price | symbol("$")}}
        </router-link> -->
      </li>
    </ul>

    <!-- 嵌套路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      goodsList: [
        { name: "电风扇1", price: 100, id: 1 },
        { name: "电风扇2", price: 200, id: 2 },
        { name: "电风扇3", price: 300, id: 3 },
        { name: "电风扇4", price: 400, id: 4 }
      ]
    };
  },
  filters: {
    symbol: function(value, sym = "¥") {
      return sym + value;
    }
  },
  methods: {
    clickHandle(item) {
      this.$router.push({
        name: "Detail",
        params: { id: item.id }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (window.isLogin) {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
  },
  // 被keep-alive缓存会触发
  activated(){
    console.log('activated');
  },
  deactivated(){
    console.log('deactivated');
  },
};
</script>


<style scoped lang='scss'>
h1 {
  color: $color;
}
li {
  list-style: none;
}
</style>
