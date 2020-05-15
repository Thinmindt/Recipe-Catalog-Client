import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Home'
import NewRecipe from '@/components/NewRecipe'

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
    }
  ]
})
