import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import Room from '../views/Room.vue';
// import Create from '../views/Create.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Game
  },
  {
    path: '/room/:id',
    name: 'room',
    component: Room
  }
  // {
  //   path: '/game/:id',
  //   name: 'game',
  //   component: Game
  // },
  // {
  //   path: '/game/new',
  //   name: 'create',
  //   component: Create
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
