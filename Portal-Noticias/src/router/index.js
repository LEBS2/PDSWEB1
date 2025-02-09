import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginAdminView from '@/views/LoginAdminView.vue'
import CadUsuarioView from '@/views/CadUsuarioView.vue'
import CadAdministradorView from '@/views/CadAdministradorView.vue'
import CadNoticiasView from '@/views/CadNoticiasView.vue'
import HomeUsuarioView from '@/views/HomeUsuarioView.vue'
import PaginaInicialView from '@/views/PaginaInicialView.vue'
import CatEsportesView from '@/views/CatEsportesView.vue'
import CatSaudeView from '@/views/CatSaudeView.vue'
import SobreView from '@/views/SobreView.vue'
import NoticiaDetalhe from '@/views/NoticiaDetalhe.vue'; // O caminho pode variar

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/loginAdmin',
      name: 'loginAdmin',
      component: LoginAdminView
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: CadUsuarioView
    },
    {
      path: '/admin',
      name: 'admin',
      component: CadAdministradorView
    },
    {
      path: '/noticias',
      name: 'noticias',
      component: CadNoticiasView,
      meta: {requiresAuth: true}
    },
    {
      path: '/usuarioHome',
      name: 'usuarioHome',
      component: HomeUsuarioView,
      meta: {requiresAuth: true}
    },
    {
      path: '/PaginaInicial',
      name: 'PaginaInicial',
      component: PaginaInicialView,
      meta: {requiresAuth: true}
    },
    {
      path: '/esporte',
      name: 'esporte',
      component: CatEsportesView,
      meta: {requiresAuth: true}

    },
    {
      path: '/saude',
      name: 'saude',
      component: CatSaudeView,
      meta: {requiresAuth: true}

    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView
    },
    
    {
      path: '/noticia/:id',
      name: 'noticiaDetalhe',
      component: NoticiaDetalhe,
    },

  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); 
      } else {
        next('/loginAdmin'); 
      }
    });
  } else {
    next(); 
  }
})

export default router
