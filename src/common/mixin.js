//混入
import backTop from "components/content/backtop/backTop"

//封装放回顶部箭头
export const backTopMixin = {
  components:{
    backTop
  },
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0);//回到顶部
    }
  }
}