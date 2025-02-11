import { createRouter, createWebHistory } from 'vue-router'
import UserDashboard from '../screens/UserDashboard.vue'
import SignupLoginScreen from '../screens/SignupLoginScreen.vue'

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