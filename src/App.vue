<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
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

    <v-app-bar
      app
      clipped-right
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn to="/auth">
        Login
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { components } from 'aws-amplify-vue'
// import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'App',

  components: {
    ...components
  },

  data() {
    return {
    drawer: null,
    blockDrawer: false,
    logger: null,
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
    }
  }
};
</script>

<style module>
.shade  { position:absolute; bottom:0; height:60px; width:100%; z-index:10;
background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(152,152,152,0) 40%, rgba(23,23,23,0.3) 90%, rgba(0,0,0,0.3) 99%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(40%,rgba(152,152,152,0)), color-stop(90%,rgba(23,23,23,0.3)), color-stop(99%,rgba(0,0,0,0.3))); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(152,152,152,0) 40%,rgba(23,23,23,0.3) 90%,rgba(0,0,0,0.3) 99%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(152,152,152,0) 40%,rgba(23,23,23,0.3) 90%,rgba(0,0,0,0.3) 99%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(152,152,152,0) 40%,rgba(23,23,23,0.3) 90%,rgba(0,0,0,0.3) 99%); /* IE10+ */
background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(152,152,152,0) 40%,rgba(23,23,23,0.3) 90%,rgba(0,0,0,0.3) 99%); /* W3C */
}
</style>
