<template>
  <div id="app">
    <nav>
      <header-top></header-top>
    </nav>
    <router-view />
  </div>
</template>

<script>
import HeaderTop from "./components/HeaderTop.vue";
export default {
  components: {
    HeaderTop,
  },
};
</script>

<style lang="scss"></style>
