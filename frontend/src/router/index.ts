import { useApp } from '@/stores/app';
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
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: {}
    },
    {
      path: '/user/:tag',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { showBackButton: true }
    },
    {
      path: '/user/:tag/followers',
      name: 'followers',
      component: () => import('../views/UserFollowersView.vue'),
      meta: { showBackButton: true }
    },
    {
      path: '/user/:tag/followings',
      name: 'followings',
      component: () => import('../views/UserFollowingsView.vue'),
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
  const app = useApp();
  app.loading = true;

  const users = useUsers();
  await users.auth();

  if (!to.meta.forGuests && users.$state.current === null) {
    router.push("/login");
    return;
  }

  if (to.meta.forGuests && users.$state.current !== null) {
    router.push("/home");
    return;
  }
})

router.afterEach((to) => {
  const app = useApp();

  // A little hack to check if the lazy loading route has been already loaded
  const route = router.getRoutes().find((route) => route.name === to.name)
  if (route?.instances.default === null) {
    app.loading = false;
    return;
  }

  setTimeout(() => {
    app.loading = false;
  }, 500);
})

export default router
