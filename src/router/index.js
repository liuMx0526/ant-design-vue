import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
/* 进度条 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";
import { check, isLogin } from "../utils/auth";
import userRouter from "./user";
import dashboard from "./dashboard";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [].concat(userRouter, dashboard, [
    // Exception
    {
      path: "/exception",
      name: "exception",
      component: { render: h => h("router-view") },
      redirect: "/exception/403",
      meta: { title: "异常页", icon: "warning", authority: ["admin"] },
      children: [
        {
          path: "/exception/403",
          name: "403",
          component: () =>
            import(/* webpackChunkName: "exception" */ "@/views/Exception/403"),
          meta: { title: "403" }
        },
        {
          path: "/exception/404",
          name: "404",
          component: () =>
            import(/* webpackChunkName: "exception" */ "@/views/Exception/404"),
          meta: { title: "404" }
        },
        {
          path: "/exception/500",
          name: "500",
          component: () =>
            import(
              /* webpackChunkName: "exception" */ "@/views/Exception/500.vue"
            ),
          meta: { title: "500" }
        }
      ]
    }
  ])
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/exception/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/exception/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
