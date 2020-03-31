import { library } from '@fortawesome/fontawesome-svg-core';
import { faVuejs } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import { DockIcon } from '@/components/DockIcon.vue';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas, faVuejs);
Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'faSvg',
    values: {
      dockmaker: {
        component: DockIcon,
      },
    },
  },
  theme: {
    dark: false,
  },
};

export default new Vuetify(opts);
