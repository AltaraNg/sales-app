<template>
  <nav
    class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
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
import altaraLogo from "@/assets/img/altaraLogo.png";

export default {
  data() {
    return { altaraLogo };
  },
  methods: {},
  components: {},
};
</script>
<style lang="css">
.logoResize {
  height: 40px;
  width: 100px;
}
</style>
