const path = require('path');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.plugin('VuetifyLoaderPlugin').tap(() => [{
      match(originalTag, { kebabTag, camelTag }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`];
        }
        return null;
      },
    }]);
    config.plugin('MonacoEditor').use(MonacoEditorPlugin, [() => ['javascript', 'css', 'html', 'typescript']]);
    config.resolve.alias
      .set('@', resolve('src'));
  },
  transpileDependencies: [
    'vuetify',
  ],

  assetsDir: 'static',

  css: {
    sourceMap: true,
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
