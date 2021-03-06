import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router/router.js';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
import Buefy from 'buefy';

Vue.use(Buefy);

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
};
