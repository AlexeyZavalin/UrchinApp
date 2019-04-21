import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login'
import Register from './components/Register'
import ProjectCreate from './components/ProjectCreate'
import ProjectDetail from './components/ProjectDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('./views/Cabinet.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/projects/create',
      name: 'projectCreate',
      component: ProjectCreate
    },
    {
      path: '/projects/:id',
      name: 'projectDetail',
      component: ProjectDetail
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
