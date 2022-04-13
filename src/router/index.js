import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { api } from "src/api/helper/ky";
import { cleanTokensData } from "src/api/helper/tokens";
export default route(function (/* { store, ssrContext } */) {
  function registrHandlers(api, next) {
    api.registrHandleRejectionToken(() => {
      cleanTokensData();
      console.log(Router);
      return Router.replace({ name: "auth" });
    });
  }
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    registrHandlers(api, next);
    // if (to.matched.some((r) => r.meta.auth)) {
    //   if (
    //     localStorage.getItem("auth") == null ||
    //     !localStorage.getItem("auth")
    //   ) {
    //     return next({ name: "auth", replace: true });
    //   }
    // }
    return next();
  });

  return Router;
});
