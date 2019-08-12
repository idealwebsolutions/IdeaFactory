<template>
  <div class="container is-fluid">
    <filter-bar v-on:filter="setActiveFilter" :filter="filter"></filter-bar>
    <visible-pins v-on:pins="fetchPins" :disabled="disabled" :pins="pins"></visible-pins>
    <div class="d-flex justify-content-center mb-3">
      <b-spinner type="grow" label="Loading" v-if="loading"></b-spinner>
    </div>
  </div>
</template>

<script>
  import FilterBar from './FilterBar.vue';
  import VisiblePins from './VisiblePins.vue';

  export default {
    data () {
      return {
        filter: 'all',
        offset: 0,
        pins: [],
        loading: false,
        disabled: false
      }
    },
    components: {
      'filter-bar': FilterBar,
      'visible-pins': VisiblePins
    },
    methods: {
      fetchPins: function () {
        const self = this
        //
        self.disabled = true
        self.loading = true
        //
        axios.get(`/api/pins/${self.offset}/${self.filter}`)
        .then(function (response) {
          console.log(response.data.pins)
          self.pins = self.pins.concat(response.data.pins)
          //
          if (!response.data.pins.length) {
            self.disabled = true
          } else {
            self.disabled = false
            setTimeout(() => {
              self.loading = false
            }, 5000)
          }
          // self.$parent.busy = false // should be until after images loaded
          self.offset += response.data.pins.length
          console.log('offset: ' + self.offset)
        })
        .catch(console.error)      
      },
      setActiveFilter: function (filter) {
        switch(filter) {
          case 'Art':
              self.filter = 'category:art'
              break
        }
        console.log('received ' + filter)
      }
    }
  };
</script>
