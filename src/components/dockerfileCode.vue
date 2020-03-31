<template>
  <v-card
    class="black scroll-y"
  >
    <prism
      language="docker"
      :code="code"
    />
  </v-card>
</template>
<script>
import '@/assets/prism-vs.css'; // eslint-disable-line

import Prism from 'vue-prismjs';

export default {
  name: 'DockerfileBlocks',
  components: {
    Prism,
  },
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      logger: null,
    };
  },
  computed: {
    vsTheme() {
      return this.$vuetify.theme.dark ? 'vs-dark' : 'vs';
    },

  },
  created() {
    this.logger = new this.$Amplify.Logger('dockerfileCODE_component');
  },
  mounted() {
  },
  beforeUpdated() {
  },
  beforeDestroy() {
  },
  methods: {
  },
};
</script>
<style>
pre[class*="language-"] {
  height: 100%;
  overflow: scroll;
  padding: 0px;
  margin: 0px;
  border: none;
  background-color: transparent;
}
code[class*="language-"] {
  background-color: transparent;
}
</style>
