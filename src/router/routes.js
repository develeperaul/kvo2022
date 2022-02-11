const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "history",
        component: () => import("pages/History.vue"),
        meta: { auth: true },
      },
      // {
      //   path: "/page/:id",
      //   name: "page",
      //   component: () => import("pages/PageKVO.vue"),
      //   meta: { auth: true },
      // },
      {
        path: "/create",
        name: "create",
        component: () => import("pages/Create.vue"),
        meta: { auth: true },
      },
      // {
      //   path: "/settings",
      //   name: "settings",
      //   component: () => import("pages/Settings.vue"),
      //   meta: { auth: true },
      // },

      {
        path: "/messages",

        name: "messages",
        component: () => import("pages/Messages.vue"),
        meta: { auth: true },
        children: [
          {
            path: "new",

            name: "new",
            component: () => import("pages/New.vue"),
          },
          {
            path: "read",
            name: "read",
            component: () => import("pages/Read.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/message",
    component: () => import("layouts/MessageLayout.vue"),
    meta: { auth: true },
    children: [
      {
        name: "message",
        path: ":id",
        component: () => import("pages/Message.vue"),
        meta: { auth: true },
      },
    ],
  },

  {
    path: "/kvo",
    component: () => import("layouts/MessageLayout.vue"),
    meta: { auth: true },
    children: [
      {
        name: "item",
        path: ":id",
        component: () => import("pages/Item.vue"),
        meta: { auth: true },
      },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", name: "auth", component: () => import("pages/Auth.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
