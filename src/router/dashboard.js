/* User route */
export default [
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () => import("../layout/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "@/views/Forms/BasicForm")
          },
          {
            path: "/form/setp-form",
            name: "setpform",
            meta: { title: "分布表单" },
            hideChildrenInMenu: true,
            redirect: "/form/step-form/info",
            component: () =>
              import(/* webpackChunkName: "form" */ "@/views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  }
];
