<template>
  <article class="card is-inline-block">
    <div class="card-image">
      <figure class="image">
        <img :alt="title" :src="content" fallback="http://via.placeholder.com/200x150" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content has-text-centered">
        <p class="title is-spaced is-6">{{ title }}</p>
        <p class="subtitle is-7">by {{ author }}</p>
      </div>
    </div>
  </article>  
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
