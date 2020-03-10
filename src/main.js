import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import PortalVue from 'portal-vue'
import Amplify, * as AmplifyModules from 'aws-amplify';
import awsconfig from '@/aws-exports-modifications';
import { AmplifyPlugin } from 'aws-amplify-vue';

const mainLogger = new Amplify.Logger('MAIN_script');

awsconfig.oauth.scope = [
  'name',
  'phone',
  'email',
  'openid',
  'profile',
  'aws.cognito.signin.user.admin',
];
mainLogger.info(
  awsconfig.oauth.redirectSignIn,
  awsconfig.oauth.redirectSignIn,
);
Amplify.configure(awsconfig);
Amplify.Logger.LOG_LEVEL = 'INFO';

Vue.config.productionTip = false

Vue.use(PortalVue)

Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')