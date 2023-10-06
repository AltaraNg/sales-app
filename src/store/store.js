import Vue from 'vue';
import Vuex from 'vuex';
import { post, get } from "../utilities/api";
import Auth from "../utilities/auth";
Vue.use(Vuex);
export const store = new Vuex.Store({
         state: {
           loader: false,
           notifications: null,
           inactiveProspects: null,
           error: null,
           employee: null,
         },
         getters: {
           getNotifications: (state) => state.notifications,
           getInactiveProspects: (state) => state.inactiveProspects,
           getEmployee: (state) => state.employee,
         },
         mutations: {
           TOGGLE_LOADER: (state, data) => Vue.set(state, "loader", data),
           MUTATE_NOTIFICATIONS: (state, notifications) =>
             Vue.set(state, "notifications", notifications),
           mutateInactiveProspects: (state, inactiveProspects) =>
             Vue.set(state, "inactiveProspects", inactiveProspects),
           error: (state, response) => Vue.set(state, "error", response),
           SAVEUSER: (state, response) => Vue.set(state, "employee", response),
         },
         actions: {
           toggleLoader: ({ commit }, bool) => commit("TOGGLE_LOADER", bool),
           mutateNotifications: ({ commit }, notifications) => {
             commit("MUTATE_NOTIFICATIONS", notifications);
           },
           mutateInactiveProspects: ({ commit }, inactiveProspects) =>
             commit("mutateInactiveProspects", inactiveProspects),
           saveUser: async ({ commit, context }, { userData, vueInstance }) => {
             await post("/api/login", userData)
               .then(({ data }) => {
                 if (data.auth) {
                   localStorage.setItem("employee", JSON.stringify(userData));
                   Auth.set(data);
                   commit("SAVEUSER", data);
                   console.log(data.in_house, "from store");
                 }
                 let notCookie = vueInstance.$getCookie("showNotification");
                 if (notCookie == null) {
                   vueInstance.$setCookie("showNotification", true);
                 }
                 //console.log(context.state.employee, 'state in action')
                 commit("TOGGLE_LOADER", false);
                 vueInstance.$router.push("/admin");
               })
               .catch((data) => {
                 data?.errors
                   ? commit("error", data?.errors)
                   : commit("error", data);

                 vueInstance.$swal({
                   icon: "error",
                   title: "Incorrect Login Details",
                 });
                 commit("TOGGLE_LOADER", false);
               });
           },
           refreshUser: async ({ commit, context }, ) => {
             await get("/api/auth/user")
               .then(({ data }) => {
                 if (data.data) {
                   commit("SAVEUSER", data.data["user "]);
                 }
                 commit("TOGGLE_LOADER", false);
               })
              
           },
         },
       });