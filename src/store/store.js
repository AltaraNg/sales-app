import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        loader: false,
        notifications: null,
        inactiveProspects: null
    },
    getters: {
        getNotifications: state => state.notifications,
        getInactiveProspects : state => state.inactiveProspects
        },
    mutations: {
        TOGGLE_LOADER: (state, data) => Vue.set(state, 'loader', data),
        MUTATE_NOTIFICATIONS: (state, notifications) => Vue.set(state, 'notifications', notifications),
        mutateInactiveProspects: (state, inactiveProspects) => Vue.set(state, 'inactiveProspects', inactiveProspects),
    },
    actions: {
        toggleLoader: ({ commit }, bool) => commit('TOGGLE_LOADER', bool),
        mutateNotifications: ({commit}, notifications) => {
            commit('MUTATE_NOTIFICATIONS', notifications)},
        mutateInactiveProspects: ({commit}, inactiveProspects) => commit('mutateInactiveProspects', inactiveProspects)
    }
});