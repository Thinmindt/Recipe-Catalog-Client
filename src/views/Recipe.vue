<template>
  <b-container class="recipe">
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
      <b-button variant="danger">
        Delete Recipe
      </b-button>
      <div>
        <b-button variant="primary">
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
/**
 * GraphQL query to update a recipe. Requires at least an ID.
 */
export const UPDATE_RECIPE = gql`
mutation UpdateRecipe($input: UpdateRecipeInput!){
  updateRecipe (input: $input) {
    recipe {
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
  }
}
`
export default {
  name: 'Recipe',
  props: ['recipeId'],
  data () {
    return {
      error: null,
      form: {
        title: '',
        recipeType: '',
        notes: '',
        rating: 0,
        web: {
          link: ''
        },
        book: {
          title: '',
          page: '',
          picture: ''
        }
      }
    }
  },
  methods: {
    onSubmit: function () {
      var picture = ''
      // submit mutation request
      this.$apollo.mutate({
        mutation: UPDATE_RECIPE,
        variables: {
          input: {
            id: this.recipeId,
            title: this.form.title,
            type: this.form.recipeType,
            notes: this.form.notes,
            rating: this.form.rating,
            webLink: this.form.web.link,
            bookTitle: this.form.book.title,
            bookPage: this.form.book.page,
            bookImagePath: picture
          }
        },
        // eslint-disable-next-line
        update: (cache, { data: { updateRecipe } }) => {
          // Read the data from our cache for this query.
          // eslint-disable-next-line
          try {
            const data = cache.readQuery({
              query: GET_ONE_RECIPE
            })
            var insertedRecipe = {node: updateRecipe,
              __typename: 'RecipeObject'}
            data.pop()
            data.push(insertedRecipe)
            cache.writeQuery({
              query: GET_ONE_RECIPE,
              data
            })
          } catch (e) {
            console.error(e)
          }
        }
      })
    }
  },
  watch: {
    recipe: function (recipe) {
      this.form.title = recipe.title
      this.form.rating = recipe.rating
      this.form.notes = recipe.notes
      this.form.recipeType = recipe.type
      this.form.book.title = recipe.bookTitle
      this.form.book.page = recipe.bookPage
      this.form.book.picture = recipe.bookImagePath
      this.form.web.link = recipe.webLink
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
