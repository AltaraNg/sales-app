<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link to="/">
          <img class="logoResize" :src="altaraLogo" alt="..." />
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import altaraLogo from "@/assets/img/logo_2.png";

export default {
  data() {
    return {
      altaraLogo,
    };
  },
  methods: {},
  components: {},
};
</script>
