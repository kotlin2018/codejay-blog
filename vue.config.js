const webpack = require('webpack')
let  isDev = process.env.NODE_ENV;  //当前的环境
module.exports = {

  configureWebpack: {
    resolve: {
      alias: {
        '@': 'src',
        'assets': 'src/assets',
        'common': 'src/common',
        'components': 'src/components',
        'network': 'src/network',
        'views': 'src/views',
      }
    },
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://192.168.1.106:3000', //设置你调用的接口域名和端口号 别忘了加http
          // changeOrigin: true, //这里设置是否跨域
          changeOrigin:isDev==='development'?true:false,
          pathRewrite: {
            '^/api': ''
          }
        }

      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
  },
}
