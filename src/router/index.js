import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import NewUser from "@/views/admin/NewUser.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import LeaderBoard from "@/views/admin/LeaderBoard.vue";
import Login from "@/views/auth/Login.vue";
import Index from "@/views/Index.vue";
import UserProfile from "@/views/user/userProfile.vue";
import Todo from "@/views/admin/Todo.vue";

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
            props: true
        },
        {
            path: "/admin/register",
            component: NewUser,
        }, {
            path: "/admin/superadmin",
            component: AdminDashboard,
        }, {
            path: "/admin/todos",
            component: Todo,
        },


        ],
    },
    {
        path: "/admin/dsaratings",
        component: LeaderBoard,
        name: "LeaderBoard"
    }, {
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
    {
        path: "/admin/userProfile/:id",
        name: "userProfile",
        component: UserProfile,
        props: true,
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