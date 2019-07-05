/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import Vue from 'vue';
import Loading from 'buefy/dist/components/loading';
import ready from 'document-ready';
import 'buefy/dist/buefy.css';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// Vue.component(Buefy.Loading.name, Buefy.Loading);
// Vue.component(Buefy.Toast.name, Buefy.Toast);
Vue.use(Loading);

ready(() => new Vue({
  el: '#app',
  components: {
    'pin-wall': () => import('./components/PinWall.vue'),
    'profile': () => import('./components/Profile.vue')
  },
  data: {}
}));
