import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import vSelect from 'vue-select';
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller';

const pinia = createPinia();
const app = createApp(App);

app
    .use(router)
    .use(pinia)
    .component('v-select', vSelect)
    .component('DynamicScroller', DynamicScroller)
    .component('DynamicScrollerItem', DynamicScrollerItem)
    .component('RecycleScroller', RecycleScroller)
    .mount('#app');
