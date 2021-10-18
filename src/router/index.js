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
import SendMessage from "@/views/admin/SendMessage.vue";
import Notifications from "@/views/admin/Notifications.vue"
import Feedback from "@/views/admin/Feedback.vue";
import Calculator from "@/views/productCalculator.vue"
import InactiveProspects from "@/views/admin/InactiveProspects.vue"

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
            props: true,
            name: "Dashboard"
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
            name: "Todos"
        },
        {
            path: "/admin/dsaratings",
            component: LeaderBoard,
            name: "LeaderBoard"
        },
        {
            path: "/admin/send_message",
            component: SendMessage,
            name: "SendMessage"
        },
        {
            path: "/admin/notifications",
            component: Notifications,
            name: 'Notifications'
        },
        {
            path: "/admin/feedback",
            component: Feedback,
            name: 'Feedback'
        },
        {
            path: "/admin/inactive-prospects",
            component: InactiveProspects,
            name: 'InactiveProspects'
        }


        ],
    },
    , {
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
        path:"/product_calculator",
        name:"productCalculator",
        component: Calculator,
        redirect:"/product_calculator/three_months",
        meta:{
            NoAuth:true
        },
        children:[
             {
            path: "/product_calculator/:name",
            name:"Result",
            component: () => import("@/components/Cards/ProductResult.vue"),
            props:true
             },
           
        ]
    },
    {
        path:"/pricing",
        name:"pricing",
        component: () => import("@/views/Pricing.vue"),
        meta:{
            NoAuth:true
        }
    },
    {
      path: "/cash_calculator",
      name: "cashCalculator",
      component: () => import("@/views/cashCalculator.vue"),
      redirect: "/cash_calculator/AltaraPayCashLoan",
      meta: {
        NoAuth: true,
      },
      children: [
        {
          path: "/cash_calculator/:name",
          name: "CashResult",
          component: () => import("@/components/Cards/CashResult.vue"),
          props: true,
        },
      ],
    },

    {
        path: "/admin/userProfile/:id",
        name: "userProfile",
        component: UserProfile,
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
    if (goingTo != "ADMIN" && !to.matched.some(route => route.meta.NoAuth)) {
        token ? reRoute("admin") : next();
        return
    }

    if (to.matched.some(route => route.meta.requiresAuth)) {
        token ? next() : reRoute("login");
        return;
    }
    next();
});
export default router;