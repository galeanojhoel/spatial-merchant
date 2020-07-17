<template>
  <main id="app">
    <HomePage/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import HomePage from './pages/HomePage.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HomePage
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
