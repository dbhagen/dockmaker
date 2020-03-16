<template>
  <div>
    <v-text-field
      v-model="githubAPIKey"
      @change="updateApiKey"
      @keyup="updateApiKey"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AmplifyStore from '@/store';

export default {
  components: {
  },
  data() {
    return {
      logger: null,
      githubAPIKey: null,
    };
  },
  computed: mapState({
    user: () => AmplifyStore.state.user,
    githubAPIKeyState: () => AmplifyStore.state.githubApiKey,
  }),
  watch: {
  },
  mounted() {
    this.githubAPIKey = this.githubAPIKeyState ? this.githubAPIKeyState : null;
    if (this.githubAPIKey) {
      this.$emit('githubApiKeyUpdated', this.githubAPIKey);
    }
  },
  created() {
    this.logger = new this.$Amplify.Logger('GITHUB-API-AUTH_component');
  },
  methods: {
    ...mapActions(['setGithubApiKey']),
    updateApiKey() {
      this.logger.info(this.githubAPIKey);
      this.setGithubApiKey(this.githubAPIKey);
      this.$emit('githubApiKeyUpdated', this.githubAPIKey);
    },
  },
};
</script>
