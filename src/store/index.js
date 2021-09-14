import { createStore } from 'vuex'

export default createStore({
  state: {
    notification: null,
    inactiveProspects: null
  },
  getters: {
    getNotifications: state => state.notifications,
    getInactiveProspects = state => state.inactiveProspects
    },
  mutations: {
    mutateNotifications: (state, notifications) => Vue.set(state, 'notifications', notifications),
    mutateInactiveProspects: (state, inactiveProspects) => Vue.set(state, 'inactiveProspects', inactiveProspects),

  },
  actions: {

    mutateNotifications: ({commit}) => commit('mutateNotifications', notifications),
    mutateInactiveProspects: ({commit}) => commit('mutateInactiveProspects', inactiveProspects)
  },
  modules: {
  }
})
