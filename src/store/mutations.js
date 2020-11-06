import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  //mutation里面尽量做简单的事情，复杂的事情先给actions解析
  // addCart(state,payload){
  //   //查找之前数组中是否有该商品
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);
  //   //如果有，则数量加一，没有则数量=1
  //   if(oldProduct){
  //     oldProduct.count += 1;
  //   }else{
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // }

  [ADD_COUNTER](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true;
    state.cartList.push(payload)
  }
}