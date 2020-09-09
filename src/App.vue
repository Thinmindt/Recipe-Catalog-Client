<!-- 
App.vue contains: navigataion bar, darkMode toggle setup and style options.
-->

<template>
  <div id="app" :class="cssClass">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand @click="redirectToHome()">Recipe Catalog</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item @click="redirectToNewRecipe()">New</b-nav-item>
        <b-nav-item-dropdown text="Categories" v-if="recipeCategories">
          <b-dropdown-item @click="redirectToCategory(category)" v-for="category in recipeCategories.edges" v-bind:key="category.node.id">
            {{ category.node.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"> 
        <b-nav-form>
        <b-form-input placeholder="Search" size= sm></b-form-input>
        <b-button variant="success" type="submit" size= sm>
          <b-icon icon="search" class=" mb-1"></b-icon>
          <!-- working on icon sizing -->
        </b-button>
          </b-nav-form>
        <b-form-checkbox switch id="dark_mode" v-model="darkMode">Dark mode
        </b-form-checkbox>
      </b-navbar-nav>
    </b-navbar>
    <router-view :darkMode="darkMode"/> <!-- feeds darkMode to router -->
  </div>
</template>

<script>
import { GET_CATEGORIES } from './views/Home.vue'

// vue specific tool:
export default { 
  name: 'App',
  data () {
    return {
      darkMode: true,
      error: null,
      category: null,
    }
  },
  computed: {  // computed: variable depends on another reactive variable:
// App Class background for App page:
    cssClass: function () {
      if (this.darkMode) {
        return "dark"
      } else {
        return "light"
      }
    }
  },
  methods: {
    redirectToNewRecipe() {
      this.$router.push({ name: 'NewRecipe'})
    },
    redirectToCategory(category) {
        this.$router.push({ name: 'HomeCategory', params: {category: category.node.name}});
    },
    redirectToHome() {
      this.$router.push({ name: 'Home', params: {category: null}});
    }
  },
  apollo: {
    recipeCategories: {
      query: GET_CATEGORIES,
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }
  }
}
</script>

<style lang="scss">
.dark {
  $darkBackground: rgb(37, 37, 37);
  background-color: $darkBackground;
}
.light {
  $lightBackground: rgb(139, 129, 155);
  background-color: $lightBackground;
}
#app {
  margin-bottom: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh; 
}
body {
  min-height: 100vh;
  color:white;
}
#ratingId {
  background-color:transparent;
}
</style>
