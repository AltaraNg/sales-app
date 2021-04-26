<template>
  <div>
    <index-navbar />
    <section
      class="header relative pt-10 bg-white items-center flex h-screen max-h-860-px"
    >
      <div class="container mx-auto items-center flex flex-wrap">
        <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div class="pt-32 sm:pt-0">
            <h1 class="font-semibold text-4xl text-gray-700">Altara.</h1>
            <p class="mt-4 text-lg leading-relaxed text-gray-600">
              Our debut product is
              <b class="text-gray-700"> “shop now, pay later” </b> where we
              allow formal & informal sector workers, and SME owners purchase a
              variety of products and equipment for their homes and businesses
              but instead of paying for the products in full upfront, pay small
              amount overtime.
            </p>
            <div class="mt-10">
              <router-link
                to="/auth/login"
                class="get-started text-white font-bold px-12 py-3 rounded outline-none focus:outline-none mr-1 mb-1 altaraBlue text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              >
                Sign In
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <img
        class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
        :src="patternVue"
        alt="..."
      />
    </section>

    <footer-component />
  </div>
</template>
<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";

import patternVue from "@/assets/img/taieri.png";

export default {
  data() {
    return {
      patternVue,
    };
  },
  components: {
    IndexNavbar,
    FooterComponent,
  },
};
</script>
