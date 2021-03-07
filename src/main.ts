import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import "element-ui/lib/theme-chalk/index.css";
import {
  Button,
  DatePicker,
  Carousel,
  CarouselItem,
  Pagination,
  Switch,
  Message,
} from "element-ui";
Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("Carousel", Carousel);
Vue.component("CarouselItem", CarouselItem);
Vue.component("Pagination", Pagination);
Vue.component("ElSwitch", Switch);

Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.onload = function () {
  setTimeout(function () {
    window.scroll(0, 100000);
  }, 0);
};
