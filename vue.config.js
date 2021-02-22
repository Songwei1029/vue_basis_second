const path = require('path')

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/common.scss'),
      ],
    })
}
module.exports = { 
  publicPath: process.env.NODE_ENV === 'production'? '/部署服务器中的文件夹名/': '/',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }, 
}