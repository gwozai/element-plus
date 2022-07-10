import { RouterView } from "vue-router";

export const ordersRoute = {
  path: ":menu/orders",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/orders/list/index.vue"),
    },
  ],
};
