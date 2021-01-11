<template>
  <div id="app">
    <loader />
    <router-view />
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";

export default {
  components: {
    Loader,
  },
};
</script>
