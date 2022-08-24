import { useUsers } from '@/stores/users';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {}
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { showBackButton: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { forGuests: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { forGuests: true }
    }
  ]
})

router.beforeEach(async (to) => {
  const users = useUsers();
  await users.auth();

  if (!to.meta.forGuests && !users.$state.authorized) {
    router.push("/login");
    return;
  }

  if (to.meta.forGuests && users.$state.authorized) {
    router.push("/home");
    return;
  }
})

export default router
