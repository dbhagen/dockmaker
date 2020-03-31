<template>
  <v-app :dark="setTheme">
    <v-app-bar
      app
      dense
      clipped-left
      clipped-right
      color="primary"
    >
      <div class="d-flex align-center">
        <v-btn
          exact-active-class
          active-class
          class="headline font-weight-bold"
          text
        >
          <dock-icon
            alt="Dockmaker Logo"
            class="shrink mr-2"
            style="max-width: 36px; max-height: 36px;"
          />
          <v-icon>$vuetify.icons.dockmaker</v-icon>
          <!-- <v-img
            alt="Dockmaker Logo"
            class="shrink mr-2"
            contain
            src="/android-chrome-256x256.png"
            transition="scale-transition"
            max-height="36"
            max-width="36"
          /> -->
          Dockmaker
        </v-btn>
        <div v-if="selectedProject">
          <v-icon>mdi-menu-right</v-icon>
          <v-btn
            to="/github"
            text
          >
            {{ selectedProject }}
          </v-btn>
        </div>
      </div>

      <v-spacer />

      <v-btn
        v-if="!user"
        color="accent"
        to="/auth"
      >
        Login
      </v-btn>
      <v-btn
        v-if="user"
        color="accent"
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
        <v-list-item
          link
          to="/"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="false"
          link
          to="/projects"
        >
          <v-list-item-action>
            <v-icon>mdi-folder-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
            <v-select :items="projects" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/github"
        >
          <v-list-item-action>
            <v-icon>mdi-github</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Github Connection</v-list-item-title>
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
    <v-footer
      app
      fixed
      class="grey px-2 caption font-weight-medium d-flex flex-row-reverse"
    >
      <div
        class="px-0 py-0 mx-2 text-right"
      >
        © 2019-{{ new Date().getFullYear() }},
        <strong>Strong Oak Studios</strong>
      </div>
      <div
        class="px-0 py-n1 ma-0"
      >
        <v-btn
          :class="$style.themebutton + ' py-0 px-0'"
          x-small
          icon
          @click="changeTheme"
        >
          <v-icon>
            mdi-theme-light-dark
          </v-icon>
        </v-btn>
        <!-- <v-switch
            v-model="$vuetify.theme.dark"
            v-col
            :class="$style.themebutton"
            hide-details
            inset
          /> -->
      </div>
    </v-footer>
  </v-app>
</template>

<script>
// import { AmplifyEventBus } from 'aws-amplify-vue';
import '@/assets/main.css';

import { AmplifyEventBus, components } from 'aws-amplify-vue';
import { mapActions, mapState } from 'vuex';

import DockIcon from '@/components/DockIcon.vue';
import AmplifyStore from '@/store/index';

export default {
  name: 'App',

  components: {
    ...components,
    DockIcon,
  },

  data() {
    return {
      darkTheme: null,
      drawer: true,
      drawerMini: true,
      drawerMiniHover: false,
      blockDrawer: false,
      logger: null,
      selectedProject: null,
      projects: [
        { text: 'test', value: 'test' },
        { text: 'test2', value: 'test2' },
      ],
    };
  },
  computed: mapState({
    user: () => AmplifyStore.state.user,
    project: () => AmplifyStore.state.project.githubString,
    storedTheme: () => AmplifyStore.state.theme,
    setTheme() {
      if (this.darkTheme === null) {
        this.darkTheme = this.storedTheme;
      }
      if (this.darkTheme === true) {
          return (this.$vuetify.theme.dark = true); // eslint-disable-line
      }
        return (this.$vuetify.theme.dark = false); // eslint-disable-line
    },
  }),
  created() {
    this.logger = new this.$Amplify.Logger('APP_component');

    AmplifyEventBus.$on('authState', (info) => {
      this.logger.info(`Here is the auth event that was just emitted by an Amplify component: ${info}`);
    });
    AmplifyEventBus.$on('projectUpdate', () => {
      this.selectedProject = this.project;
    });
    this.selectedProject = this.project;
    this.darkTheme = this.storedTheme;
  },
  methods: {
    ...mapActions(['setStoredTheme']),
    changeTheme() {
      this.darkTheme = !this.darkTheme;
      this.setStoredTheme(this.darkTheme);
    },
    blockDrawerChanged(evt) {
      this.blockDrawer = evt;
    },
    drawerPinClick() {
      this.drawerMiniHover = !this.drawerMiniHover;
      if (this.drawerMiniHover) {
        this.drawerMini = false;
      }
    },
  },
};
</script>

<style module>
.themebutton {
  max-width: 18px;
  max-height: 18px;
}
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
