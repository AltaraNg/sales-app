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
    async beforeCreate() {
      Auth.initialize();
     const employee = this.$store.state.employee
     if( this.$route.path.includes('admin') && !employee ){
      await  this.$store.dispatch("refreshUser");
     }
      
    },
  };
</script>
<style>
  .altaraBlueText {
    color: #094a73;
  }

  .pointer {
    cursor: pointer;
  }

  select.is-invalid,
  textarea.is-invalid,
  input.is-invalid[type="text"],
  input.is-invalid[type="email"],
  input.is-invalid[type="tel"],
  input.is-invalid[type="number"] {
    border-color: #c81618 !important;
    border-width: 1px;
  }

  small.text-muted,
  form small:not(.error-control) {
    font-size: 1.1rem;
    color: #c81618 !important;
    float: left;
    width: 100%;
  }

  textarea {
    width: 100%;
  }
</style>
