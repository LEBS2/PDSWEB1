import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/loginAdmin',
      name: 'loginAdmin',
      component: () => import('../views/LoginAdminView.vue'),
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('../views/CadUsuarioView.vue'),
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/CadAdministradorView.vue'),
    },

    {
      path: '/noticias',
      name: 'noticias',
      component: () => import('../views/CadNoticiasView.vue'),
    },

    {
      path: '/usuarioHome',
      name: 'usuarioHome',
      component: () => import('../views/HomeUsuarioView.vue'),
    },

    {
      path: '/PaginaInicial',
      name: 'PaginaInicial',
      component: () => import('../views/PaginaInicialView.vue'),
    },

    {
      path: '/esporte',
      name: 'esporte',
      component: () => import('../views/CatEsportesView.vue'),
    },

    {
      path: '/saude',
      name: 'saude',
      component: () => import('../views/CatSaudeView.vue'),
    },

    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/SobreView.vue'),
    }
  ],
})

export default router
