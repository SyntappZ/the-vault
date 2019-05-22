import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Passwords from './views/Passwords.vue'
import Notes from './views/Notes.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/Passwords',
      name: 'passwords',
      component: Passwords,

    },
    {
      path: '/Notes',
      name: 'notes',
      component: Notes,

    }
  ]
})