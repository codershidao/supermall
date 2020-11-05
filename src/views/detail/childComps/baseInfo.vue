<!-- 详情页基本信息展示，若数据为空，则不展示 -->
<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price"><del>{{goods.oldPrice}}</del></span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>

    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name:"baseInfo",
  props: {
    goods: {
      type: Object,
      default:{}
    }
  }
}
</script>

<style  scoped>
.info-title{
  color: #333;
}
.info-price{
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  height: 50px;
}
.n-price{
  color: var(--color-hight-text);
  font-size: 20px;
}
.o-price{
  font-size: 12px;
  margin-left: 5px;
  color: #777;
}
.discount{
  position: absolute;
  font-size:12px;
  color: #fff;
  background-color:var(--color-hight-text);
  border-radius: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
}
.info-other{
  display: flex;
  font-size: 12px;
  color: #888;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}
.info-other span{
  flex: 1;
  margin-left: 10px;
}
.info-services{
  margin-top: 10px;
  display: flex;
}
.info-services-item{
  flex: 1;
  font-size: 8px;
}
.info-services-item img{
  height: 10px;
  width: 10px;
}
</style>
