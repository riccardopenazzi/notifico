const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  configureWebpack: {
    devtool: 'source-map', // Abilita la mappatura delle sorgenti per il debugging
  },
})
