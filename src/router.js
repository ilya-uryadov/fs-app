import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Thanks from './views/Thanks.vue';
import DataList from './views/DataList.vue';
import DataCard from './views/DataCard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: Thanks     //() => import('./views/Thanks.vue')
    },
    {
      path: '/data',
      name: 'data',
      component: DataList
    },
    {
      path: '/card',
      name: 'card',
      component: DataCard
    }
  ]
})
