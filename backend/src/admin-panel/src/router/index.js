import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/home/Home.vue";
import Login from "@/views/login/Login.vue";
import { getUserDetailsService } from "@/client/services/user/getUserDetailsService";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      // Check if the user is authenticated (e.g., by checking the Vuex store)
      if (Cookies.get("admin-jwt")) {
        // User is already logged in, redirect to the home page or another page
        next("/");
      } else {
        // User is not logged in, allow access to the login page
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!Cookies.get("admin-jwt")) return next("/login");
    try {
      // Make the API call to get user details
      const response = await getUserDetailsService();

      // Check if the API call was successful
      if (response.status === 200) {
        const userData = response.data;
        // Check if the user is an admin
        if (userData.isAdmin) {
          // Proceed to the requested route
          next();
        } else {
          // User is not an admin, redirect to an unauthorized page
          Cookies.remove("admin-jwt");
          next("/unauthorized");
        }
      } else {
        // API call failed, redirect to the login page or display an error
        Cookies.remove("admin-jwt");
        next("/login");
      }
    } catch (error) {
      console.error(error);
      // Handle API call errors and redirect to an appropriate page
      Cookies.remove("admin-jwt");
      next("/error");
    }
  } else {
    // The route doesn't require authentication, so proceed to it
    next();
  }
});

export default router;