import Vue from "vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import App from "@/App.vue";

import "./utilities/globalFunctions.js";
import VueSweetalert2 from "vue-sweetalert2";
import { store } from "./store/store";
import VeeValidate from "vee-validate";
import router from './router'


Vue.config.productionTip = false;

Vue.use(VeeValidate, {
    events: "input|blur",
    classes: true,
    classNames: { invalid: "is-invalid" }
});
export const eventBus = new Vue(); // added line

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

const options = {
    confirmButtonColor: "#05314d",
    cancelButtonColor: "#05314d"
};

Vue.use(VueSweetalert2, options);