import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";

export default createRouter({
  history: createWebHistory("/frontend-demo/"),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: "Demo",
      },
    },
  ],
});
