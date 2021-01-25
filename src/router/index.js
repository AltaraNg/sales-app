import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import Login from "@/views/auth/Login.vue";
import Index from "@/views/Index.vue";
import { routerHistory, writeHistory } from "vue-router-back-button";
import Flash from "@/utilities/flash";

Vue.use(VueRouter);
Vue.use(routerHistory);
const router = new VueRouter({
    hashbang: false,
    history: true,
    linkActiveClass: "active",
    mode: "history",
    routes: [{
        path: "/admin",
        name: "admin",
        redirect: "/admin/dashboard",
        component: Admin,
        meta: { requiresAuth: true },
        children: [{
            path: "/admin/dashboard",
            component: Dashboard,
        },
        {
            path: "/admin/register",
            component: Settings,
        }, {
            path: "/admin/superadmin",
            component: AdminDashboard,
        },


        ],
    },
    {
        path: "/login",
        redirect: "/auth/login",
        component: Auth,
        name: "login",
        children: [{
            path: "/auth/login",
            component: Login,
        },],
    },
    {
        path: "/landing",
        name: "landing",
        component: Index,
    },
    { path: "/", redirect: { name: "landing" } },

    { path: "*", redirect: "/" },
    ]
});
// const router = new VueRouter({
//     routes,
// });

router.mode = "html5";
router.afterEach(writeHistory);
router.beforeEach((to, from, next) => {
    const reRoute = path => {
        Flash.setError("You do not have access to that page!");
        return next({ name: path });
    };
    const goingTo = to.path
        .split("/")
        .filter(Boolean)[0]
        .toUpperCase();
    const token = localStorage.getItem("api_token");
    goingTo != "ADMIN" && token ? reRoute("admin") : next();


    if (to.matched.some(route => route.meta.requiresAuth)) {
        token ? next() : reRoute("login");
    }

    next();
});
export default router;