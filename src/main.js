import Vue from 'vue'
import App from './App.vue'
import './assets/css/Style.css';
Vue.config.productionTip = false
// router
import VueRouter from 'vue-router'
import router from "./router/app.js";
Vue.use(VueRouter);

// Bootstrap vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VueGraph from 'vue-graph'

Vue.use(VueGraph)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
