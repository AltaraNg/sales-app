import Vue from "vue";
import VueRouter from "vue-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import App from "@/App.vue";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Login from "@/views/auth/Login.vue";
import Index from "@/views/Index.vue";
import "./utilities/globalFunctions.js";
import VueSweetalert2 from "vue-sweetalert2";
import { store } from "./store/store";

const routes = [{
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        children: [{
                path: "/admin/dashboard",
                component: Dashboard,
            },
            {
                path: "/admin/settings",
                component: Settings,
            },
            {
                path: "/admin/tables",
                component: Tables,
            }
        ],
    },
    {
        path: "/login",
        redirect: "/auth/login",
        component: Auth,
        children: [{
                path: "/auth/login",
                component: Login,
            },

        ],
    },
    {
        path: "/index",
        name: "landing",
        component: Index,
    }, { path: "/", redirect: { name: "landing" } },

    { path: "*", redirect: "/" },
];


Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

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