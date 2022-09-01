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
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      meta: { showBackButton: true }
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
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue'),
      meta: { showBackButton: true, menuType: true }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
      meta: { forAny: true, showBackButton: true, menuType: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { forAny: true, showBackButton: true, menuType: true }
    },
    {
      path: '/languages',
      name: 'languages',
      component: () => import('../views/LanguagesView.vue'),
      meta: { forAny: true, showBackButton: true, menuType: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { forAny: true, showBackButton: true, menuType: true }
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
  if (!to.meta.menuType) app.routeBeforeMenu = to.fullPath;

  // A little hack to check if the lazy loading route has been already loaded
  const route = router.getRoutes().find((route) => route.name === to.name)
  if (route?.instances.default !== null) app.loading = "loading";

  setTimeout(() => {
    if (app.initialLoad === "waiting") app.initialLoad = "done";
    if (app.initialLoad === "loading") app.initialLoad = "waiting";

    if (app.loading === "waiting") app.loading = "done";
    if (app.loading === "loading") app.loading = "waiting";
  }, 500);

  const users = useUsers();
  await users.auth();

  if (to.meta.forAny) return;

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

  if (app.initialLoad === "waiting") app.initialLoad = "done";
  if (app.initialLoad === "loading") app.initialLoad = "waiting";

  if (app.loading === "waiting") app.loading = "done";
  if (app.loading === "loading") app.loading = "waiting";
})

export default router
