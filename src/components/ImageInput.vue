<template>
  <div>
    <div v-if="existingPictures">
    <b-form-row class="mb-1" v-for="image in existingPictures" :key="image.node.id">
      <b-col cols="2">
        <label>Existing Picture</label>
      </b-col>
      <b-col>
        <b-img thumbnail :src="resolveImageUrlWidth(image.node.filename, 300, 300)" fluid></b-img>
      </b-col>
    </b-form-row>
    </div>
    <b-form-row class="mb-1" v-for="picture in formPictures" v-bind:key="picture.id">
      <b-col cols="2">
        <label>Picture {{picture.id}}:</label>
      </b-col>
      <b-col>
        <b-form-file 
          id="picture"
          v-model="picture.value"
          :state="Boolean(picture.value)"
          accept="image/*"
          placeholder="Choose file or drop it here"
        ></b-form-file>
      </b-col>
      <b-col>
        <div v-if="picture.value">
          <b-button @click="removeAddedPicture(picture)" v-if="picture.value">
            -
          </b-button>
          <b-button @click="addAnotherPicture()" 
                    v-if="pictureInputsFull && lastIndex == picture.id">
            +
          </b-button>
        </div>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import resolveImage from '../mixins/resolveImage';
export default {
  name: "ImageInput",
  mixins: [ resolveImage ],
  data: function() {
     return {
     }
  },
  props: ['formPictures', 'existingPictures'],
  methods: {
    addAnotherPicture: function () {
      var newIndex = 0;
      this.formPictures.forEach(picture => {
        if (picture.id > newIndex) {
          newIndex = picture.id;
        }
      })
      newIndex += 1;
      this.formPictures.push( {id: newIndex, value: null} );
    },
    removeAddedPicture: function(picture) {
      if(this.formPictures.length > 1) {
        this.formPictures.splice(picture.id, 1);
      } else {
        this.formPictures[0].value = null;
      }
    }
  },
  computed: {
    pictureInputsFull: function() {
      var full = true;
      this.formPictures.forEach(element => {
        if (!element.value) {
          full = false;
        }
      });
      return full;
    },
    lastIndex: function() {
      var last = 0;
      this.formPictures.forEach(element => {
        if (element.id > last) {
          last = element.id;
        }
      })
      return last;
    }
  }
}
</script>

<style scoped>

</style>