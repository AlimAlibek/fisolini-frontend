// подключенные модули
import Vue from 'vue';
import App from './App.vue';
import vueNotification from 'vue-notification';
import router from './router';
import store from '@/store';
import axios from 'axios';
import vuetify from './plugins/vuetify'

Vue.use(vueNotification);

Vue.prototype.$http = axios;

// default url for production version
Vue.config.productionTip = false;

if(Vue.config.productionTip){
  axios.defaults.baseURL = 'https://api.halalfoods.ru/admin/';
}else{
  // axios.defaults.baseURL = 'http://season-market-api/admin/';
  axios.defaults.baseURL = 'http://localhost:8080/';
  // axios.defaults.baseURL = 'https://dev.fisolini.ru/';
}

// token for auth
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
