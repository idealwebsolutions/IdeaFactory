/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

import Vue from 'vue';
// import BootstrapVue from 'bootstrap-vue';
import { 
  BSpinner, 
  BCollapse,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNav, 
  BNavItem, 
  BNavItemDropdown,
  BDropdownItem,
  BCard,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BCardGroup
} from 'bootstrap-vue';
import ready from 'document-ready';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// Vue.component(Buefy.Loading.name, Buefy.Loading);
// Vue.component(Buefy.Toast.name, Buefy.Toast);
Vue.component('b-spinner', BSpinner);
Vue.component('b-collapse', BCollapse);
Vue.component('b-navbar', BNavbar);
Vue.component('b-navbar-brand', BNavbarBrand);
Vue.component('b-navbar-toggle', BNavbarToggle);
Vue.component('b-navbar-nav', BNavbarNav);
Vue.component('b-nav', BNav);
Vue.component('b-nav-item', BNavItem);
Vue.component('b-nav-item-dropdown', BNavItemDropdown);
Vue.component('b-dropdown-item', BDropdownItem);
Vue.component('b-card', BCard);
Vue.component('b-card-body', BCardBody);
Vue.component('b-card-title', BCardTitle);
Vue.component('b-card-sub-title', BCardSubTitle);
Vue.component('b-card-group', BCardGroup);

ready(() => new Vue({
  el: '#app',
  components: {
    'pin-wall': () => import('./components/PinWall.vue'),
    'profile': () => import('./components/Profile.vue')
  },
  data: {}
}));
