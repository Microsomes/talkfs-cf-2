import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LangView from '../views/pages/lang.vue';
import steamView from '../views/pages/steam.vue';
import RoomView from '../views/pages/room.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: LangView
  },
  {
    path: '/lang',
    name:'lang',
    component: LangView
  },
  {
    path: '/room/:id',
    name:'room',
    component: RoomView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
