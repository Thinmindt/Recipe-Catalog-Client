<template>
  <div id="app" :class="background">
    <b-navbar type="dark" :variant="variant">
      <b-navbar-brand to="/">Recipe Catalog</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item @click="redirectToNewRecipe()">New</b-nav-item>
        <b-nav-item to="#" disabled>Categories</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"> 
        <b-form-checkbox switch id="dark_mode" v-model="darkMode">Dark mode
        </b-form-checkbox>
      </b-navbar-nav>
    </b-navbar>
    <router-view :darkMode="darkMode"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      darkMode: true
    }
  },
  computed: {
    variant: function () {
      if (this.darkMode) {
        return "dark"
      } else {
        return "info"
      }
    },
    background: function () {
      if (this.darkMode) {
        return "dark"
      } else {
        return "light"
      }
    }
  },
  methods: {
    redirectToNewRecipe() {
      this.$router.push({ name: 'NewRecipe', params: {darkMode: this.darkMode}})
    }
  }
}
</script>

<style lang="scss">
.dark {
  background-color: black;
}
.light {
  background-color: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}
</style>
