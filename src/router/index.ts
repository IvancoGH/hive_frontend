import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/customer/LoginPage.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/customer/RegisterPage.vue'),
    },
    {
      path: '/cars',
      name: 'cars',
      component: () => import('@/pages/customer/ViewCarPage.vue'),
    },
    {
      path: '/cars/details',
      name: 'car-details',
      component: () => import('@/pages/customer/CarDetails.vue'),
    },
    {
      path: '/provider',
      name: 'dashboard',
      component: () => import('@/pages/provider/DashboardPage.vue'),
    },
    {
      path: '/provider/login',
      name: 'login-prv',
      component: () => import('@/pages/provider/LoginPage.vue'),
    },
    {
      path: '/provider/sign-up',
      name: 'sign-up-prv',
      component: () => import('@/pages/provider/RegisterPage.vue'),
    },
    {
      path: '/provider/cars',
      name: 'view-cars',
      component: () => import('@/pages/provider/ViewCarPage.vue'),
    },
    {
      path: '/provider/cars/add',
      name: 'add-car',
      component: () => import('@/pages/provider/AddCarPage.vue'),
    },
    {
      path: '/provider/cars/edit',
      name: 'edit-car',
      component: () => import('@/pages/provider/EditCarPage.vue'),
      props: true,
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/pages/handler/PageLoggedOut.vue')
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/pages/handler/PageNotFound.vue'),
    }
  ],
});

export default router;
