<!--
Home.vue contains: cards component setup and style options.
-->

<template>
  <b-container class="home" id="body">
    <div v-if="$apollo.queries.allRecipes.loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <b-card-group columns>
      <b-card v-for="recipe in allRecipes.edges" :key="recipe.id"
        id="recipe_card"
        v-on:click="clickRecipe(recipe.node.id)"
        :bgVariant="cardColor"
        :borderVariant="cardBorder"
        textVariant="primary"
      >
        <b-card-title id="recipe_title">
          {{ recipe.node.title }}
        </b-card-title>
        <b-card-sub-title>
          <p>
            Category/Description-Here
          </p>
        </b-card-sub-title>
        <b-card-text align="right">
          <b-form-rating 
            id="ratingId" 
            v-model="recipe.node.rating" 
            readonly 
            variant="warning" 
            size="sm" 
            inline value
            no-border>
          </b-form-rating>
        </b-card-text>
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
        rating
      }
    }
  }
}`

export default {
  name: 'Home',
  props: ['darkMode'],
  data () {
    return {
      allRecipes: [],
      error: null
    }
  },
  methods: {
    /**
     * use view router to navigate to recipe page
     */
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
  },
  computed: {
    cardColor: function () {
      if (this.darkMode) {
        return "secondary"
      } else {
        return "black"
      }
    },
    cardBorder: function () {
      if (this.darkMode) {
        return "secondary"
      } else {
        return "primary"
      }
    },  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #recipe_card {
    cursor: pointer;
    max-width: 20rem;
  }
  #body {
    margin-top: 35px;
    margin-bottom: 0px;
  }
</style>
