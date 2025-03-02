import { createRouter, createWebHistory } from 'vue-router'
import UserDashboard from '../screens/UserDashboard.vue'
import SignupLoginScreen from '../screens/SignupLoginScreen.vue'
import DeadlinesManagement from '../screens/DeadlinesManagement.vue'

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
    },
    {
      path: '/deadlines-management',
      name: 'DeadlinesManagement',
      component: DeadlinesManagement,
    }
  ]
})

export default router