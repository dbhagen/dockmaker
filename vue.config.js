module.exports = {
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
