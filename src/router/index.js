import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewRecipe from '@/components/NewRecipe'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new',
      name: 'NewRecipe',
      component: NewRecipe
    },
    {
      path: '/recipe',
      name: 'Recipe',
      component: Recipe,
      props: true
    }
  ]
})
