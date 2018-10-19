<template>
  <div class="container">
    <div class="wall">
      <Pin 
        v-for="pin in pins"
        :key="pin.id"
        :title="pin.title"
        :content="pin.content"
        :author="pin.author"
        :likes="pin.likes"
      ></Pin>
    </div>
    <div v-infinite-scroll="getMorePins" infinite-scroll-disabled="disabled" infinite-scroll-distance="10"></div>
  </div>
</template>

<style scoped>
  .wall {
    column-count: 4;
    column-gap: 1em;
    flex-flow: 'row wrap';
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
