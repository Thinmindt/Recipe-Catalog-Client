<template>
  <b-container id="NewRecipe">
    <div v-if="error">{{ error }}</div>
    <b-form @submit="onSubmit">
      <b-form-row>
        <b-col cols="2">
          <label for="title-input">Title: </label>
        </b-col>
        <b-col>
          <b-form-input
            id="title-input"
            v-model="form.title"
            required
            placeholder="Enter Title"
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col cols="2">
          <label for="type-input">Type:</label>
        </b-col>
        <b-col>
          <b-form-select
            id="type-input"
            v-model="form.recipeType"
            :options="recipeTypes"
            required
          ></b-form-select>
        </b-col>
      </b-form-row>
      <b-form-row v-if="isWeb">
        <b-col cols="2">
          <label for="link-input">Link:</label>
        </b-col>
        <b-col>
          <b-form-input
            id="link-input"
            v-model="form.web.link"
            required
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row v-if="isBook">
        <b-col cols="2">
          <label for="book-title-input">Book Title:</label>
        </b-col>
        <b-col>
          <b-form-input
            id="book-title-input"
            v-model="form.book.title"
            required
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="book-pg-input">Page:</label>
        </b-col>
        <b-col cols="1">
          <b-form-input
            id="book-pg-input"
            v-model="form.book.page"
            required
            type="number"
            min=0
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row v-if="isBook">
        <b-col cols="2">
          <label for="book-picture">Picture(s):</label>
        </b-col>
        <b-col>
          <b-form-file
            v-model="form.book.picture"
            :state="Boolean(form.book.picture)"
            accept="image/*"
            placeholder="Choose file or drop it here"
          ></b-form-file>
        </b-col>
      </b-form-row>
      <br>
      <b-form-row>
        <b-col cols="2">
          <label for="rating-input">Rating:</label>
        </b-col>
        <b-col>
          <b-form-rating
            id="rating-input"
            v-model="form.rating"
          ></b-form-rating>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col cols="2">
          <label for="notes-input">Notes:</label>
        </b-col>
        <b-col>
          <b-form-textarea
            id="notes-input"
            v-model="form.notes"
            placeholder="Enter notes about the recipe here..."
            rows="5"
          ></b-form-textarea>
        </b-col>
      </b-form-row>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import gql from 'graphql-tag'
import { GET_ALL_RECIPES } from './Home.vue'
export const SUBMIT_RECIPE = gql`
mutation SubmitRecipe($input: CreateRecipeInput!){
  createRecipe (input:$input) {
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
  name: 'NewRecipe',
  props: ['darkMode'],
  data () {
    return {
      form: {
        title: '',
        recipeType: null,
        notes: '',
        rating: 0,
        web: {
          link: ''
        },
        book: {
          title: '',
          page: 0,
          picture: null
        }
      },
      recipeTypes: ['Book', 'Website'],
      allRecipes: [],
      error: null
    }
  },
  methods: {
    onSubmit: function () {
      // save picture to disk, save relative link
      var picture = ''
      // submit mutation request
      this.$apollo.mutate({
        mutation: SUBMIT_RECIPE,
        variables: {
          input: {
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
        update: (cache, { data: { createRecipe } }) => {
          // Read the data from our cache for this query.
          // eslint-disable-next-line
          try {
            const data = cache.readQuery({
              query: GET_ALL_RECIPES
            })
            var insertedRecipe = {node: createRecipe.recipe,
              __typename: 'RecipeObjectEdge'}
            data.allRecipes.edges.push(insertedRecipe)
            cache.writeQuery({
              query: GET_ALL_RECIPES,
              data
            })
          } catch (e) {
            console.error(e)
          }
        }
      })
    }
  },
  computed: {
    isBook: function () {
      if (this.form.recipeType === 'Book') {
        return true
      } else {
        return false
      }
    },
    isWeb: function () {
      if (this.form.recipeType === 'Website') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
#NewRecipe {
  margin-top: 50px
}
</style>
