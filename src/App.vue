<!-- 
App.vue contains: navigataion bar, darkMode toggle setup and style options.
-->

<template>
  <div id="app" :class="cssClass">
    <b-navbar type="dark" variant="info">
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
    <router-view :darkMode="darkMode"/> <!-- feeds darkMode to router -->
  </div>
</template>

<script>
// vue specific tool:
export default { 
  name: 'App',
  data () {
    return {
      darkMode: true
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
    }
  }
}
</script>

<style lang="scss">
.dark {
  background-color: rgb(37, 31, 31);
}
.light {
  background-color: rgb(231, 182, 182);
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
</style>
