<template>
  <div id="app">
    <loader />
    <router-view />
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";
import Auth from "./utilities/auth";
import axios from "axios";

export default {
  components: {
    Loader,
  },
  mounted() {
    axios.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        if (error.response.status === 401) {
          this.bounceUser();
        }
        return Promise.reject(error);
      }
    );
  },
  methods: {
    bounceUser() {
      Auth.remove();
      this.$router.push("/auth/login");
    },
  },
  beforeCreate() {
    Auth.initialize();
  },
};
</script>
