import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        loader: false,
    },
    getters: {

    },
    mutations: {
        TOGGLE_LOADER: (state, data) => Vue.set(state, 'loader', data)
    },
    actions: {
        toggleLoader: ({ commit }, bool) => commit('TOGGLE_LOADER', bool)
    }
});