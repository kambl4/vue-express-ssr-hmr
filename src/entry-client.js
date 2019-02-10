import { createApp } from './main.js';

const { app, router, store } = createApp();

router.onReady(() => {
  app.$mount('#app');
});