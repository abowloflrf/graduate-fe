import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.prototype.$axios=axios;
Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
