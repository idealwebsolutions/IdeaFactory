/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import Vue from 'vue';
import Buefy from 'buefy';
import ready from 'document-ready';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component(Buefy.Loading.name, Buefy.Loading);
// Vue.component(Buefy.Toast.name, Buefy.Toast);

ready(() => new Vue({
  el: '#app',
  components: {
    'pin-wall': () => import('./components/PinWall.vue'),
    'profile': () => import('./components/Profile.vue')
  },
  data: {}
}));
