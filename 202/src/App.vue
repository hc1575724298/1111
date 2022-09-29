<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
@import "./style/base.css";
  #app {
    font-family: 'ArialMT','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  * {
    padding: 0;
    margin: 0;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;

  }

</style>
