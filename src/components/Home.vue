<template>
  <b-container class="home">
    <div v-if="$apollo.queries.allRecipes.loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <b-card-group columns>
      <b-card v-for="recipe in allRecipes.edges" :key="recipe.id"
        style="max-width: 20rem;"
        v-on:click="clickRecipe(recipe.node.id)"
      >
        <b-card-title>
          {{ recipe.node.title }}
        </b-card-title>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import gql from 'graphql-tag'
export const GET_ALL_RECIPES = gql`
query {
  allRecipes {
    edges {
      node {
        id
        title
        type
        bookTitle
      }
    }
  }
}`

export default {
  name: 'Home',
  data () {
    return {
      allRecipes: [],
      error: null
    }
  },
  methods: {
    clickRecipe: function (recipeId) {
      this.$router.push({ name: 'Recipe', params: { recipeId: recipeId } })
    }
  },
  apollo: {
    allRecipes: {
      query: GET_ALL_RECIPES,
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
