export default {
  methods: {
    resolveImageUrl: function (filename) {
      return this.$hostname + 'image/' + filename;
    },
    resolveImageUrlWidth: function (filename, height, width) {
      return this.$hostname + 'image/' + filename + '/h+w/' + height + '/' + width
    }
  }
};