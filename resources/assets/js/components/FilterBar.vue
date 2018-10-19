<template>
  <nav class="navbar is-transparent is-mobile is-centered">
    <div class="navbar-menu navbar-center">
      <div class="navbar-start"></div>
      <div class="navbar-center">
        <a class="navbar-item" href="#" @click="handleFilterChange('following')">Following</a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="#">Categories</a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="#" @click="handleFilterChange(category)" v-for="category in categories">
              {{ category }}
            </a>
          </div>     
        </div>
      </div>
      <div class="navbar-end"></div>
    </div>
  </nav>
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
