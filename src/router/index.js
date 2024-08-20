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
          path: "Signup",
          name: "Signup",
          component: () => import("../views/Signup.vue"),
        },
        {
          path: "Login",
          name: "Login",
          component: () => import("../views/Login.vue"),
        },
      ],
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "Main",
          name: "Main",
          component: () => import("../views/Main.vue"),
        },
        {
          path: "Notes",
          name: "Notes",
          component: () => import("../views/Notes.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  let loggedIn =
    (localStorage.getItem("loggedIn") == "true" ? true : false) || false;

  if (to.meta.requiresAuth && !loggedIn) return { name: "Login" };
  if ((to.name.startsWith("Login") || to.name.startsWith("Signup")) && loggedIn)
    return { path:"/Dashboard"
   };
  if (to.meta.requiresAuth && loggedIn) return true;
  if (!to.meta.requiresAuth && !loggedIn) return true;
});

export default router;
