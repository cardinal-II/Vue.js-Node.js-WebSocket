import { computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "./admin";
import playerRoutes from "./player";
import { use_login_store } from "@/stores/login";

//console.log('router, index')
const routes = [
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/NewsView.vue"),
  },

  {
    path: "/rules",
    name: "rules",
    component: () => import("@/views/RulesView.vue"),
  },

  {
    path: "/faq",
    name: "faq",
    component: () => import("@/views/FaqView.vue"),
  },

  // {
  //   path: "/admin",
  //   name: "admin",
  //   component: () => import("@/views/AdminView.vue"),
  // },
  {
    path: "/tester",
    name: "tester",
    component: () => import("@/views/TesterView.vue"),
  },

  // {
  //   path: "/email_confirmation",
  //   name: "email_confirmation",
  //   component: () => import("@/views/login/EmailConfirmationView.vue"),
  //   beforeEnter: async (to, from, next) => {
  //     const login_store = use_login_store();
  //     let login_user = computed(() => login_store.user);
  //     //console.log("router, login, before", login_store.user.role, from, to);
  //     if (login_user.value && login_user.value.email_confirmed == false) {
  //       next();
  //     } else {
  //       next('/news');
  //     }
  //   },
  // },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/LoginView.vue"),
    beforeEnter: async (to, from, next) => {
      const login_store = use_login_store();
      let login_user = computed(() => login_store.user);
      //console.log("router, login, before", login_store.user.role, from, to);
      if (login_user.value && !login_user.value.token) {
        //new user
        next();
      } else {
        //next("/re" + login_store.user.role);
        next('/news');
      }
    },
  },

  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },

  ...adminRoutes,
  ...playerRoutes,

  {
    path: "/:pathMatch(.*)*",
    redirect: "/tester",
    //component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(
    import.meta.env.VITE_ENV == 'development' || import.meta.env.VITE_ENV == 'staging'
      ? import.meta.env.BASE_URL
      : import.meta.env.VITE_PRODUCTION_FRONT_DIRECTORY
  ),
  base:
    import.meta.env.VITE_ENV == 'development' || import.meta.env.VITE_ENV == 'staging'
      ? import.meta.env.BASE_URL
      : import.meta.env.VITE_PRODUCTION_FRONT_DIRECTORY,
  routes: routes
});

router.beforeEach((to, from) => {
  const login_store = use_login_store();
  let login_user = computed(() => login_store.user);
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && login_user.value && !login_user.value.token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
  // if (login_user.value && login_user.value.email_confirmed == false) {
  //   return {path: "/email_confirmation"}
  // }
})

export { routes };
export default router;
