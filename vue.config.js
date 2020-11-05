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
  lintOnSave: false
}