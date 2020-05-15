<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand to="/">Recipe Catalog</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/new">New</b-nav-item>
        <b-nav-item to="#" disabled>Categories</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
