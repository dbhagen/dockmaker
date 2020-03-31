import Amplify from 'aws-amplify';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// TODO: Set localstorage encryption

const Logger = new Amplify.Logger('STORE_script'); // eslint-disable-line no-unused-vars

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    theme: false,
    project: { name: null, githubString: null, dockerfile: null },
    dockerfile: null,
    githubApiKey: null,
    organizationSelected: null,
    repositorySelected: null,
    branchSelected: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setGithubApiKey(state, apikey) {
      state.githubApiKey = apikey;
    },
    setProject(state, { name, githubString, dockerfile }) {
      if (name) {
        state.project.name = name;
      }
      if (githubString) {
        state.project.githubString = githubString;
      }
      if (dockerfile) {
        state.project.dockerfile = dockerfile;
      }
    },
    setDockerfile(state, dockerfileContent) {
      state.dockerfile = dockerfileContent;
    },
    setOrganizationSelected(state, organization) {
      state.organizationSelected = organization;
    },
    setRepositorySelected(state, repository) {
      state.repositorySelected = repository;
    },
    setBranchSelected(state, branch) {
      state.branchSelected = branch;
    },
    clearAll(state) {
      state.user = null;
      state.githubApiKey = null;
      state.organizationSelected = null;
      state.repositorySelected = null;
      state.branchSelected = null;
    },
  },
  actions: {
    setUser({ commit }, user) {
      if (user) {
        commit('setUser', user);
      } else {
        commit('clearAll');
      }
    },
    setStoredTheme({ commit }, theme) {
      commit('setTheme', theme);
    },
    setGithubApiKey({ commit }, apikey) {
      commit('setGithubApiKey', apikey);
    },
    setProject({ commit }, { name, githubString, dockerfile }) {
      commit('setProject', { name, githubString, dockerfile });
    },
    setDockerfile({ commit }, dockerfileContent) {
      commit('setDockerfile', dockerfileContent);
    },
    setOrganizationSelected({ commit }, organization) {
      commit('setOrganizationSelected', organization);
    },
    setRepositorySelected({ commit }, repository) {
      commit('setRepositorySelected', repository);
    },
    setBranchSelected({ commit }, branch) {
      commit('setBranchSelected', branch);
    },
  },
  modules: {
  },
});
