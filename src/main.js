import Vue from "vue";
import VueI18n from "vue-i18n";
import queryString from "query-string";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";
import {
  Button,
  Layout,
  Icon,
  Menu,
  Drawer,
  Radio,
  Form,
  Input,
  Select,
  Row,
  Col,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";
// import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import Authorized from "./components/Authorized";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
// import "ant-design-vue/dist/antd.less"

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.component("Authorized", Authorized);

Vue.use(VueHighlightJS);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});
// 使用阿里巴巴iconfont
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1239530_ls05wlmrpzm.js" // 在 iconfont.cn 上生成
});

Vue.component("IconFont", MyIcon);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
