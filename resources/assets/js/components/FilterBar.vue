<template>
  <b-nav align="center">
    <b-nav-item @click="handleFilterChange('following')">Following</b-nav-item>
    <b-nav-item-dropdown text="Categories" toggle-class="nav-link" left>
      <b-dropdown-item @click="handleFilterChange(category)" :key="index" v-for="(category, index) in categories">
        {{ category }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-nav>
</template>

<script>
  export default {
    data () {
      return {
        categories: ['Animals/Pets', 'Art', 'Architecture', 'Gifts', 'Popular', 'Everything']
      }
    },
    methods: {
      handleFilterChange: function (category) {
        this.$emit('filter', category)
      }
    }
  }
</script>
