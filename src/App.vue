<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
    >
      <div class="d-flex align-center">
        <v-btn
          to="/"
          text
        >
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </v-btn>
      </div>

      <v-spacer />

      <v-btn
        v-if="!user"
        to="/auth"
      >
        Login
      </v-btn>
      <v-btn
        v-if="user"
        to="/auth/signout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant="drawerMini"
      :expand-on-hover="drawerMiniHover"
      app
      stateless
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item
            link
            @click="drawerPinClick"
          >
            <v-list-item-action>
              <v-icon v-if="drawerMiniHover">
                mdi-pin-off
              </v-icon>
              <v-icon v-if="!drawerMiniHover">
                mdi-pin
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-if="drawerMiniHover">
                Keep Open
              </v-list-item-title>
              <v-list-item-title v-if="!drawerMiniHover">
                Hover over
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            :disabled="drawerMiniHover"
            @click="drawerMini=!drawerMini"
          >
            <v-list-item-action>
              <v-icon v-if="drawerMini">
                mdi-menu-right
              </v-icon>
              <v-icon v-if="!drawerMini">
                mdi-menu-left
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Colapse</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="blockDrawer"
      right
      clipped
      app
      stateless
    >
      <portal-target
        ref="portal-target"
        name="destination"
        multiple
        @change="blockDrawerChanged"
      />
      <div :class="$style.shade" />
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AmplifyStore from './store/index';
import { components } from "aws-amplify-vue";
// import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: "App",

  components: {
    ...components
  },

  data() {
    return {
      drawer: true,
      drawerMini: true,
      drawerMiniHover: false,
      blockDrawer: false,
      logger: null
    };
  },
  computed: {
    user() {
      return AmplifyStore.state.user;
    }
  },
  created() {
    this.logger = new this.$Amplify.Logger("APP_component");

    // AmplifyEventBus.$on('authState', info => {
    // this.logger.info(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
    // });
  },
  methods: {
    blockDrawerChanged(evt) {
      this.blockDrawer = evt;
    },
    drawerPinClick() {
      this.drawerMiniHover=!this.drawerMiniHover
      if (this.drawerMiniHover) {
        this.drawerMini = false;
      }
    }
  }
};
</script>

<style module>
.shade {
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  z-index: 10;
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(152, 152, 152, 0) 40%,
    rgba(23, 23, 23, 0.3) 90%,
    rgba(0, 0, 0, 0.3) 99%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(255, 255, 255, 0)),
    color-stop(40%, rgba(152, 152, 152, 0)),
    color-stop(90%, rgba(23, 23, 23, 0.3)),
    color-stop(99%, rgba(0, 0, 0, 0.3))
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(152, 152, 152, 0) 40%,
    rgba(23, 23, 23, 0.3) 90%,
    rgba(0, 0, 0, 0.3) 99%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(152, 152, 152, 0) 40%,
    rgba(23, 23, 23, 0.3) 90%,
    rgba(0, 0, 0, 0.3) 99%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(152, 152, 152, 0) 40%,
    rgba(23, 23, 23, 0.3) 90%,
    rgba(0, 0, 0, 0.3) 99%
  ); /* IE10+ */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(152, 152, 152, 0) 40%,
    rgba(23, 23, 23, 0.3) 90%,
    rgba(0, 0, 0, 0.3) 99%
  ); /* W3C */
}
</style>
