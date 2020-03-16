<template>
  <div class="pa-2 ma-2">
    <v-row>
      <v-col>
        <github-api-auth @githubApiKeyUpdated="updateGithubApiKey" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <github-repo-picker
          v-if="githubAPIKey"
          :github-api-key="githubAPIKey"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import GithubApiAuth from '@/components/GithubApiAuth';
import GithubRepoPicker from '@/components/GithubRepoPicker';
import AmplifyStore from '@/store';

export default {
  components: {
    GithubRepoPicker,
    GithubApiAuth,
  },
  data() {
    return {
      logger: null,
      githubAPIKey: null,
    };
  },
  computed: mapState({
    user: () => AmplifyStore.state.user,
  }),
  watch: {
  },
  mounted() {
  },
  created() {
    this.logger = new this.$Amplify.Logger('GITHUB_component');
  },
  methods: {
    ...mapActions([]),
    updateGithubApiKey(val) {
      this.githubAPIKey = val;
      this.logger.info('updatedkey', val);
    },
  },
};
</script>
