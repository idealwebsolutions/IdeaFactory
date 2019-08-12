<template>
  <div class="container">
    <b-card-group columns>
      <Pin 
        v-for="pin in pins"
        :key="pin.id"
        :title="pin.title"
        :content="pin.content"
        :author="pin.author"
        :likes="pin.likes"
      ></Pin>
    </b-card-group>
    <div v-infinite-scroll="getMorePins" infinite-scroll-disabled="disabled" infinite-scroll-distance="10"></div>
  </div>
</template>

<style scoped>
  .card-columns {
    column-count: 4;
  }
</style>

<script>
  import infiniteScroll from 'vue-infinite-scroll';
  import Pin from './Pin.vue';

  export default {
    data () {
      return {
      }
    },
    props: {
      pins: {
        type: Array,
        required: true
      },
      disabled: Boolean
    },
    directives: { infiniteScroll },
    methods: {
      getMorePins: function () { 
        this.$emit('pins')
      }
    },
    components: {
      'Pin': Pin
    }
  };
</script>
