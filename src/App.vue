<template>
  <div id="app">
    <loader />
    <router-view />
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";
import Auth from "./utilities/auth";

export default {
  components: {
    Loader,
  },
  beforeCreate() {
    Auth.initialize();
  },
};
</script>
