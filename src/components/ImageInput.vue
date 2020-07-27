<template>
  <b-form-row class="mb-1">
    <b-col cols="2">
      <label for="picture">Pictures:</label>
    </b-col>
    <b-col>
      <b-form-file v-for="picture in pictures" v-bind:key="picture.id"
        id="picture"
        v-model="picture.value"
        :state="Boolean(picture.value)"
        accept="image/*"
        placeholder="Choose file or drop it here"
      ></b-form-file>
    </b-col>
    <b-col>
      <b-button @click="addAnotherPicture()" v-if="pictures[pictures.length-1].value != null">+</b-button>
    </b-col>
  </b-form-row>
</template>

<script>
module.exports =  {
  data: function() {
     return {
     }
  },
  props: ['pictures'],
  methods: {
    addAnotherPicture: function () {
      this.pictures.push( {id: this.pictures.length, value: null} )
    }
  }
}
</script>

<style scoped>

</style>