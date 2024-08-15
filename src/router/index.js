import { createRouter, createWebHistory } from "vue-router";
import GetStarted from "../views/GetStarted.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "GetStarted",
      component: GetStarted,
      meta: { requiresAuth: false },
      children: [
        {
          path: "/Signup",
          name: "Signup",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/Signup.vue"),
        },
        {
          path: "/Login",
          name: "Login",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/Login.vue"),
        },
      ],
    },
    {
      path: "/User",
      name: "User",
      component: () => import("../views/User.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  let loggedIn =
    (localStorage.getItem("loggedIn") == "true" ? true : false) || false;

  if (to.meta.requiresAuth && !loggedIn) return { name: "Login" };
  if ((to.name.startsWith("Login") || to.name.startsWith("Signup")) && loggedIn)
    return { path:"/User"
   };
  if (to.meta.requiresAuth && loggedIn) return true;
  if (!to.meta.requiresAuth && !loggedIn) return true;
});

export default router;
