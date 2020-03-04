module.exports = {
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(() => [{
      match (originalTag, { kebabTag, camelTag }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }])
  },
  "transpileDependencies": [
    "vuetify"
  ],

  assetsDir: 'static',

  css: {
    sourceMap: true
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
