<!-- Page annotation -->
<template>
  <div  class="bottom-bar">
    <div class="check-content">
      <checkButton class="check-button" @click.native="checkClick" :isChecked='isSelectAll'/>
      <span>全选</span>
    </div>
    <div class='price'>
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click='aclcClick'>
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton'
export default {
  name:"bottomBar",
  components:{
    checkButton
  },
  computed:{
    totalPrice(){
      return '¥' + this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((previous,item) =>{
        return previous + item.price * item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.$store.state.cartList === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
         this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    aclcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择要购买的商品')
      }else{
        this.$toast.show('购买成功')
      }
    }
  }
}
</script>

<style  scoped>
.bottom-bar{
  height: 40px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 49px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 30px;
  flex: 1;
}
.calculate{
  width: 90px;
  background-color: red;
  color: white;
  text-align: center;
}
</style>
