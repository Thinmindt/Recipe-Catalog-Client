<template>
  <div class="hello">
    <h1>{{ recipe }}</h1>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export const GET_ONE_RECIPE = gql`
query OneRecipe ($recipeId: String) {
  recipe (recipeId: $recipeId) {
    id
    title
    type
    bookTitle
  }
}`
export default {
  name: 'Recipe',
  props: ['recipeId'],
  data () {
    return {
      error: null
    }
  },
  apollo: {
    recipe: {
      query: GET_ONE_RECIPE,
      variables: {
        id: this.recipeId
      },
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
