/** 
 * index.js imports the pages from src/views/, allowing the browser to navigate these pages.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import NewRecipe from '@/views/NewRecipe'
import Recipe from '@/views/Recipe'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/:category',
      name: 'HomeCategory',
      component: Home,
      props: true 
    },
    {
      path: '/new',
      name: 'NewRecipe',
      component: NewRecipe,
      props: true
    },
    {
      path: '/recipe/:recipeId',
      name: 'Recipe',
      component: Recipe,
      props: true
    },
    {
      path: '/recipe/edit/:recipeId',
      name: 'EditRecipe',
      component: NewRecipe,
      props: true
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
