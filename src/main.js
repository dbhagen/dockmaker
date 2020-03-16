import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import axios from 'axios';
import PortalVue from 'portal-vue';
import Vue from 'vue';
import VueAxios from 'vue-axios';

import App from './App.vue';
import awsconfig from './aws-exports-modifications';
import i18n from './i18n';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);

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

Vue.config.productionTip = false;

Vue.use(PortalVue);

Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
