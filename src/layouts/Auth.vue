<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full altaraBlue bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";

import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
    Navbar,
    FooterSmall,
  },
};
</script>
<style>
.altaraBlueText {
  color: #094a73;
}
.altaraBlue {
  background-color: #094a73;
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
</style>