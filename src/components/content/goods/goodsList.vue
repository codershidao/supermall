<!-- Page annotation -->
<template>
  <div class="goods">
    <goodsListItem v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
import goodsListItem from './goodsListItem'
export default {
  name:"goodsList",
  props: {
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    goodsListItem
  }
}
</script>

<style  scoped>
.goods{
  display: flex;
  /* 会自动换行 */
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
