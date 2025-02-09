import { createRouter, createWebHistory } from 'vue-router'
import UserDashboard from '../components/UserDashboard.vue'
import SignupLoginScreen from '../components/SignupLoginScreen.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'SignupLogin',
      component: SignupLoginScreen,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: UserDashboard,
    }
  ]
})

export default router