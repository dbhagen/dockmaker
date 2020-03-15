import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// TODO: Set localstorage encryption
Vue.use(Vuex);
/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    organizationSelected: null,
    repositorySelected: null,
    branchSelected: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
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
      state.organizationSelected = null;
      state.repositorySelected = null;
      state.branchSelected = null;
    },
  },
  actions: {
    setOrganizationSelected({ commit }, organization) {
      commit('setOrganizationSelected', organization);
    },
    setRepositorySelected({ commit }, repository) {
      commit('setRepositorySelected', repository);
    },
    setBranchSelected({ commit }, branch) {
      commit('setBranchSelected', branch);
    },
    setUser({ commit }, user) {
      if (user) {
        commit('setUser', user);
      } else {
        commit('clearAll');
      }
    },
  },
  modules: {
  },
});
