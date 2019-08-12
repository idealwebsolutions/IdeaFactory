<template>
  <b-card no-body class="text-center" tag="article">
    <b-card-img-lazy :alt="title" :src="content" fallback="http://via.placeholder.com/200x150" top></b-card-img-lazy>
    <b-card-body>
      <b-card-title>{{ title }}</b-card-title>
      <b-card-sub-title class="mb-2">by {{ author }}</b-card-sub-title>
    </b-card-body>
  </b-card>  
</template>

<style scoped>
  .card {
    margin: 0 0 1em;
  }
</style>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      content: { 
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      }
    },
    methods: {
      handleLoad: function () {
      },
      handleFail: function () {
      }
    }
  };
</script>
