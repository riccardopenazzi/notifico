import { createRouter, createWebHistory } from 'vue-router'
import UserDashboard from '../components/UserDashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: UserDashboard
    },
  ]
})

export default router