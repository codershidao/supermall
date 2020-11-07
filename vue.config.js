module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        //@ 在里面配置为/src
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
        postcss: {
            plugins: [
                require('postcss-px-to-viewport')({
                  viewportWidth: 375, //视口宽度
                  viewportHeight: 667,//视口高度
                  unitPrecision: 5,//指定px转换为视口单位时的小数位数
                  viweportUnit: 'vw',//指定需要转换的单位
                  minPixelValue: 1,//当px《=1时，不转换
                  mediaQuery: false,//是否允许媒体查询
                  exclude:[/TabBar/,/tabbar/],//不想转化的文件，/TabBar/是正则表达式，表示文件名包含TabBar的都排除
                  //selectorBlackList: ['tab-bar'] 排除这个class
                })
            ]
        }
    }
}
}



