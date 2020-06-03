<!--
Recipe.vue allows you to view and edit established recipe.
-->

<template>
  <b-container class="recipe" v-if="recipe">
<!-- Title -->
    <h1 class="mt-3 mb-1">{{ recipe.title }}
        <b-form-rating 
          :id="ratingId" 
          class="mt-1 mb-1"
          v-model="recipe.rating" 
          readonly 
          variant="warning" 
          size="sm" 
          inline value="10" 
          no-border>
        </b-form-rating>
        </h1>
<!-- Link -->
    <p class="mt-1 mb-1">
      Link: 
    </p>
    <p v-if="recipe.type == 'Website'">{{ recipe.webLink }}</p>
<!-- Book Stuff -->
    <b-container v-if="recipe.type == 'Book'" class="border border-dark mt-1 mb-3">
      <p class="mt-1 mb-1">Title: {{ recipe.bookTitle }}</p>
      <p class="mt-1 mb-1">Page: {{ recipe.bookPage }}</p>
      <p class="mt-1 mb-1">Image: {{ recipe.bookImagePath }}</p>
      <img :src=imageUrl v-if="recipe.bookImagePath">
    </b-container>
<!-- Notes -->
    <p class="mt-1 mb-1">Notes: </p>
    <p class="mb-5" v-html="recipe.notes" id="notesDescription"></p>
<!-- Buttons -->
    <b-row align-h="end">
      <div>
        <b-button variant="success" @click="editRecipe">
          Edit
        </b-button>
      </div>
    </b-row>
    <img v-for="image in recipe.images.edges" v-bind:key="image.node.id" :src="resolveImageUrl(image.node.filename)">
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
    images {
      edges {
        node {
          id
          filename
        }
      }
    }
  }
}`
export default {
  name: 'Recipe',
  props: ['recipeId', 'darkMode'],
  data () {
    return {
      error: null,
    }
  },
  computed: {
    ratingId: function () {
      if (this.darkMode) {
        return "dark"
      } else {
        return "light"
      }
    },
    imageUrl: function() {
      var filename = this.recipe.bookImagePath
      return "http://192.168.50.9:5000/image/" + filename
    }
  },
  methods: {
    editRecipe: function () {
      this.$router.push({ name: "EditRecipe", params: {recipeId: this.recipeId}})
    },
    resolveImageUrl: function (filename) {
      return "http://192.168.50.9:5000/image/" + filename
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
#dark {
  background-color: rgb(37, 31, 31);
}
#light {
  background-color: rgb(231, 182, 182);
}
#notesDescription {
  background-color:#1d195588;
  padding-left: 25px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 5px;
}
</style>
