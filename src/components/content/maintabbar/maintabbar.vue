<!--  -->
<template>
  <div>
     <tab-bar>
    <tab-bar-item path="/home" >
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/homeActive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" alt="" slot='item-icon'>
      <img src="~assets/img/tabbar/categoryActive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="~assets/img/tabbar/cart.svg" alt="" slot='item-icon'>
      <img src="~assets/img/tabbar/cartActive.svg" alt="" slot='item-icon-active'>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot='item-icon'>
      <img src="~assets/img/tabbar/profileActive.svg" alt="" slot='item-icon-active'>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/TabBar/TabBar"
import TabBarItem from "components/common/TabBar/TabBarItem"
export default {
  name:"maintabbar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style  scoped>

</style>
