<template>
  <div class="recipe">
    <b-container v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <h4>Resource: {{ recipe.type }}</h4>
      <b-container v-if="recipe.type == 'Website'" class="border border-dark">
        <p>Link: {{ recipe.webLink }}</p>
      </b-container>
      <b-container v-if="recipe.type == 'Book'" class="border border-dark">
        <p>Title: {{ recipe.bookTitle }}</p>
        <p>Page: {{ recipe.bookPage }}</p>
        <p>Image: {{ recipe.bookImagePath }}</p>
      </b-container>
      <p @click="clickEditNotes">Notes: {{ recipe.notes }}</p>
      <b-form-textarea
            id="notes-input"
            v-if="editNotes"
            v-model="form.notes"
            placeholder="Enter notes about the recipe here..."
            rows="5"
          ></b-form-textarea>
      <b-container v-if="editRating === false" @click="clickEditRating">
        <b-form-rating v-model="recipe.rating" readonly></b-form-rating>
      </b-container>
      <b-container v-if="editRating">
        <b-form-rating v-model="form.rating"></b-form-rating>
      </b-container>
    </b-container>
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
      editNotes: false,
      editRating: false,
      form: {
        notes: '',
        rating: 0
      }
    }
  },
  methods: {
    clickEditNotes: function () {
      this.editNotes = true
      this.form.notes = this.recipe.notes
    },
    clickEditRating: function () {
      this.editRating = true
      this.form.rating = this.recipe.rating
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
