<template>
  <section class="hero is-error">
    <div class="hero-body">
      <div class="container">
        <article class="media">
          <figure class="media-left">
            <img :alt="displayname" :src="avatar" v-on:error="handleError" />
          </figure>
          <div class="media-content">
            <h1 class="title">{{ displayname }}</h1>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>

<script>
  export default {
    props: {
      displayname: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    },
    methods: {
      handleError: function (err) {
        console.error(err)
      }
    }
  }
</script>
