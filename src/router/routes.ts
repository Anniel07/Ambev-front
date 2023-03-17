import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { registerGuard } from './Guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/lista-eventos', component: () => import('pages/EventList.vue') },
      { path: '/add-eventos', component: () => import('pages/AddEvent.vue') },
      { path: '/farol-atingimento', component: () => import('pages/FarolAtingimento.vue') },
      { path: '/relatorio-auditoria', component: () => import('pages/RelAudit.vue') },
      { path: '/cadastro-evento-preenchido/:id', component: () => import('pages/EventDetails.vue') },
      { path: '/editar-evento/:id', component: () => import('pages/EditEvent.vue') },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
/*
const router = createRouter({
  history: createWebHistory(),
  routes,
});
*/
//registerGuard(router);

export default routes;
