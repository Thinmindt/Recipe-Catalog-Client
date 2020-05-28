<!--
Recipe.vue allows you to view and edit established recipe.
-->

<template>
  <b-container class="recipe" v-if="recipe">
<!-- Title -->
    <h1>{{ recipe.title }}</h1>
<!-- Link -->
    <p v-if="recipe.type == 'Website'">Link: {{ recipe.webLink }}</p>
<!-- Book Stuff -->
    <b-container v-if="recipe.type == 'Book'" class="border border-dark">
      <p>Title: {{ recipe.bookTitle }}</p>
      <p>Page: {{ recipe.bookPage }}</p>
      <p>Image: {{ recipe.bookImagePath }}</p>
    </b-container>
<!-- Notes -->
    <p>Notes: {{ recipe.notes }}</p>
<!-- Rating -->
    <b-form-rating v-model="recipe.rating" readonly></b-form-rating>
<!-- Buttons -->
    <b-row align-h="end">
      <div>
        <b-button variant="primary" @click="editRecipe">
          Edit
        </b-button>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag'
/**
 * GraphQL query to get data for a single recipe
 */
export const GET_ONE_RECIPE = gql`
query OneRecipe ($recipeId: ID!) {
  recipe (id: $recipeId) {
    id
    title
    type
    webLink
    bookTitle
    bookPage
    bookImagePath
    notes
    rating
  }
}`
export default {
  name: 'Recipe',
  props: ['recipeId'],
  data () {
    return {
      error: null,
    }
  },
  methods: {
    editRecipe: function () {
      this.$router.push({ name: "EditRecipe", params: {recipeId: this.recipeId}})
    }
  },
  apollo: {
    recipe: {
      query: GET_ONE_RECIPE,
      variables () {
        return {
          recipeId: this.recipeId
        }
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
