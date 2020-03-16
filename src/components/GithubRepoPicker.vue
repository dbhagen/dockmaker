<template>
  <div>
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <v-select
          v-model="organizationSelected"
          label="Organization"
          :items="Object.keys(organizations)"
          @change="setOrganization"
        />
      </v-col>
      <v-col v-if="Object.keys(repositories).length != 0">
        <v-select
          v-model="repositorySelected"
          label="Repository"
          :items="Object.keys(repositories)"
          @change="setRepository"
        />
      </v-col>
      <v-col v-if="Object.keys(branches).length != 0">
        <v-select
          v-model="branchSelected"
          label="Branch"
          :items="Object.keys(branches)"
          @change="setBranch"
        />
      </v-col>
      <v-col v-if="showFileFinder">
        <v-text-field />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <rawDisplayer
          :value="branches"
          title="Branches"
        />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <rawDisplayer
          :value="repositories"
          title="Repositories"
        />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <rawDisplayer
          :value="organizations"
          title="Organizations"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
import github from 'octonode';
import { mapActions, mapState } from 'vuex';

import rawDisplayer from '@/components/raw-displayer.vue';
import AmplifyStore from '@/store';

/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default {
  components: {
    rawDisplayer,
  },
  props: {
    githubApiKey: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      logger: null,
      gitTree: { organizations: { repositories: { branches: {} } } },
      organizations: { dbhagen: {} },
      organizationSelected: null,
      repositories: {},
      repositorySelected: null,
      branches: {},
      branchSelected: null,
      githubClient: null,
      showFileFinder: false,
      storeActive: false,
    };
  },
  computed: mapState({
    user: () => AmplifyStore.state.user,
    organizationSelectedState: (state) => state.organizationSelected,
    repositorySelectedState: (state) => state.repositorySelected,
    branchSelectedState: (state) => state.branchSelected,
  }),
  watch: {
    organizationSelected(newVal) {
      if (newVal) {
        this.getRepositories(newVal);
      }
    },
    repositorySelected(newVal) {
      if (newVal) {
        this.getBranches(newVal);
      }
    },
    branchSelected(newVal) {
      if (newVal) {
        this.findDockerFile(newVal);
      }
    },
  },
  mounted() {
    /* eslint-disable no-unused-vars */
    const forceLoad = this.organizationSelectedState;
    // console.log('mst', this.organizationSelectedState);
    // this.$refs.organizationSelector = this.organizationSelectedState;
  },
  created() {
    this.logger = new this.$Amplify.Logger('GITHUB-REPO-PICKER_component');
    this.githubClient = github.client(this.githubApiKey);

    const ghme = this.githubClient.me();

    this.getOrganizations().then(() => {
      if (this.organizationSelectedState) {
        this.organizationSelected = this.organizationSelectedState;
      }
      if (this.repositorySelectedState) {
        this.repositorySelected = this.repositorySelectedState;
      }
      if (this.branchSelectedState) {
        this.branchSelected = this.branchSelectedState;
      }
    });
  },
  methods: {
    ...mapActions(['setOrganizationSelected', 'setRepositorySelected', 'setBranchSelected', 'setProject']),
    async getOrganizations() {
      const ghme = this.githubClient.me();

      ghme.orgsAsync().then((data) => {
        const returnedOrganizations = data[0];

        for (const currentOrganization in returnedOrganizations) {
          const organizationToAdd = returnedOrganizations[currentOrganization].login;

          if (!this.gitTree.organizations[organizationToAdd]) {
            this.$set(this.gitTree.organizations, organizationToAdd, {
              name: organizationToAdd,
              repositories: {},
            });
          }
          if (!this.organizations[organizationToAdd]) {
            this.$set(this.organizations, organizationToAdd, {});
          }
        }
      });
    },
    async getRepositories(val) {
      const ghme = this.githubClient.me();

      ghme.reposAsync().then((data) => {
        this.repositories = {};
        this.showFileFinder = false;
        // TODO: Figure out why private repos aren't showing up

        const returnedRepositories = data[0];

        for (const currentRepositoryIndex in returnedRepositories) {
          const repositoryToAdd = returnedRepositories[currentRepositoryIndex].name;
          const repositoryToAddOwner = returnedRepositories[currentRepositoryIndex].owner.login;

          if (repositoryToAddOwner === this.organizationSelected
           && !this.repositories[repositoryToAdd]) {
            this.$set(this.repositories, repositoryToAdd, { owner: repositoryToAddOwner });
          }
        }
      });
    },
    async getBranches(val) {
      const ghrepo = this.githubClient.repo(`${this.organizationSelected}/${val}`);

      ghrepo.branchesAsync().then((data) => {
        this.showFileFinder = false;
        this.branches = {};

        const branchesReturned = data[0];

        for (const branchIndex in branchesReturned) {
          const branch = branchesReturned[branchIndex];
          this.$set(this.branches, branch.name, {});
        }
      });
    },
    async findDockerFile(val) {
      const ghrepo = this.githubClient.repo(
        `${this.organizationSelected}/${this.repositorySelected}`,
      );
      ghrepo
        .contentsAsync('Dockerfile', val)
        .then((data) => {
          const dockerfileReturned = data[0];
          const dockerFileContent = atob(dockerfileReturned.content);
          this.setProject({ dockerfile: 'Dockerfile' });
        })
        .error((err) => {
          if (err.statusCode === 404) {
            this.showFileFinder = true;
            this.setProject({ dockerfile: null });
          }
        });
    },
    setOrganization(val) {
      this.showFileFinder = false;
      this.setRepository(null);
      this.repositories = {};

      this.organizationSelected = val;
      this.setOrganizationSelected(val);
      this.setProject({ githubString: `${this.organizationSelected}` });
      AmplifyEventBus.$emit('projectUpdate');
    },
    setRepository(val) {
      this.showFileFinder = false;
      this.setBranch(null);
      this.branches = {};

      this.repositorySelected = val;
      this.setRepositorySelected(val);
      this.setProject({ name: val, githubString: `${this.organizationSelected}/${val}` });
      AmplifyEventBus.$emit('projectUpdate');
    },
    setBranch(val) {
      this.showFileFinder = false;

      this.setBranchSelected(val);
      this.branchSelected = val;
      this.setProject({ name: this.repositorySelected, githubString: `${this.organizationSelected}/${this.repositorySelected}#${val}` });
      AmplifyEventBus.$emit('projectUpdate');
    },
  },
};
</script>
