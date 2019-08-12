<template>
  <b-card no-body class="card text-center" :img-alt="title" :img-src="content" fallback="http://via.placeholder.com/200x150" tag="article" img-top>
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
