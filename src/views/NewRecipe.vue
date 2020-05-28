<!--
NewRecipe.vue adds a new recipe. 
-->

<template>
  <b-container id="NewRecipe">
    <div v-if="error">{{ error }}</div>
    <b-form @submit="onSubmit" @reset="onReset">
<!-- Title form begins -->
      <b-form-row>
        <b-col>
        </b-col>
        <b-col align-self="end" cols="*" class="mb-3">
          <b-button 
            v-if="recipeId" 
            @click="deleteRecipe" 
            variant="danger" 
            size="sm">
            <b-icon icon="trash"></b-icon>
            </b-button>
        </b-col>
      </b-form-row>
      <b-form-row class="mb-1">
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
<!-- Title ends, Type begins -->      
      <b-form-row class="mb-1">
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
      </b-form-row >
<!-- WebSite option begins -->
      <b-form-row v-if="isWeb" class="mb-1">
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
<!-- Book title option begins -->
      <b-form-row v-if="isBook" class="mb-1">
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
<!-- Book picture option begins -->
      <b-form-row v-if="isBook" class="mb-1">
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
<!-- Type ends, Notes begins -->
      <b-form-row class="mb-1">
        <b-col >
          <label for="notes-input">Notes:</label>
        </b-col>
        <b-col>
          <div class="editor">
            <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
              <div class="editorMenuBar">
                <button           
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                 >
                  Bold
                </button>
              </div>  
            </editor-menu-bar>
            <div class="editorContent">
              <editor-content class="editor__content" :editor="editor" /> 
            </div>
          </div>
          <!-- <b-form-textarea
            id="notes-input"
            v-model="form.notes"
            placeholder="Enter notes about the recipe here..."
            rows="15"
          ></b-form-textarea> -->
        </b-col>
      </b-form-row>
<!-- Notes end, Rating begins -->
      <b-form-row class="mb-5">
        <b-col cols="2">
          <label for="rating-input">Rating:</label>
        </b-col>
        <b-col>
          <b-form-rating
            id="rating-input"
            v-model="form.rating"
            variant="warning"
            no-border
          ></b-form-rating>
        </b-col>
      </b-form-row>
<!-- Rating end, submit begins -->
      <b-form-row class="mb-3">
        <b-col > 
          <!-- empty column to offset submit block-->
        </b-col>
        <b-col cols="10">
          <b-button type="submit" block variant="success" >Submit</b-button>
        </b-col>
      </b-form-row>
<!-- Submit ends, Cancel begins -->
      <b-form-row>
        <b-col>
          <!-- empty column to offset cancel block-->
        </b-col>
        <b-col cols="*">
          <b-button type="reset" variant="danger" size="sm">Cancel</b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script>
import gql from 'graphql-tag'
import { GET_ALL_RECIPES } from './Home.vue'
import { GET_ONE_RECIPE } from './Recipe.vue'

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

/**
 * GraphQL query for creating a new recipe entry
 */
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

/** 
 * GraphQL Query to delete a recipe
 */
export const DELETE_RECIPE = gql`
mutation DeleteRecipe($input: DeleteRecipeInput!){
  deleteRecipe (input: $input) {
    ok
  }
}
`

export default {
  name: 'NewRecipe',
  props: ['darkMode', 'recipeId'],
  components: {
    EditorContent,
    EditorMenuBar
  },
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
      error: null,
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
      content: '<p>Content</p>'
    })
  },
  methods: {
    onSubmit: function () {
      if (!this.recipeId) { // Not editing recipe, submit new one
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
      } else { // editing recipe, submit mutation
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
        this.$router.push({ name: "Recipe", params: {recipeId: this.recipeId} })
      }
    },
    onReset: function () {
      this.$router.push({ name: "Recipe", params: {recipeId: this.recipeId} })
    },
    deleteRecipe: function () {
      this.$apollo.mutate({
        mutation: DELETE_RECIPE,
        variables: {
          input: {
            id: this.recipeId
          }
        },
        // eslint-disable-next-line
        update: (cache, { data: { deleteRecipe } }) => {
          // Update the cache.
          if (deleteRecipe.ok) {
            try {
              const data = cache.readQuery({
                query: GET_ALL_RECIPES
              })
              const allRecipes = data.allRecipes.edges
              var recipeToDelete = 0;
              for (var i = 0; i < allRecipes.length; i++) {
                if (allRecipes[i].node.id === this.recipeId) {
                  recipeToDelete = i
                  break
                }
              }
              allRecipes.splice(recipeToDelete, 1)
              cache.writeQuery({
                query: GET_ALL_RECIPES,
                data
              })
              this.$router.push({ name: "Home"})
            } catch (e) {
              console.error(e)
            }
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
        if (this.recipeId) {
          this.error = JSON.stringify(error.message)
        }
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style scoped>
#NewRecipe {
  margin-top: 50px;
  color: white;
}
#rating-input {
  background-color: rgba(245, 245, 220, 0);
}
</style>
