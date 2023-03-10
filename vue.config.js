const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径，不能使用路径别名
        path.resolve(__dirname, "./src/assets/theme.less"),
      ],
    },
  }

})
