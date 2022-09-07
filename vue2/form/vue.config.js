const { defineConfig } = require('@vue/cli-service')
const UnoCSS = require('@unocss/webpack').default
const { presetAttributify, presetUno } = require('unocss')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: (config) => {
    config.plugins.push(UnoCSS({
      presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
        // ...custom presets
      ],
    }))
  },
})
