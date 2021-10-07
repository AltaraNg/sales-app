<template>
  <div class="bg-white">
    <index-navbar />
    <div
      class="w-full h-full flex flex-col items-center bg-white bg-no-repeat"
      :style="`background-image: url('${registerBg2}');`"
    >
      <div
        class="
          w-full
          mt-10
          lg:mb-10
          md:h-screen
          md:flex-row
          flex flex-col
          space-y-10
          md:px-0
          px-16
          md:py-0
          py-20
          items-center
          justify-evenly
        "
      >
        <router-link
          :to="{ name: 'cashCalculator' }"
          class="
            border
            transition
            duration-500
            ease-in-out
            transform
            hover:-translate-y-1
            hover:scale-110
            flex
            items-center
            flex-col
            h-auto
            py-8
            px-8
            md:w-1/3
            w-full
            rounded-md
            shadow-xs
            hover:shadow-2xl
            altaraBlue
          "
        >
          <p
            class="
              text-white
              mb-6
              font-bold
              leading-3
              tracking-wider
              text-base
              lg:text-2xl
            "
          >
            Altara CashLoans
          </p>
          <div class="h-11/12 w-9/12">
            <img
              src="@/assets/img/cashloan.png"
              class="object-contain w-full h-full"
            />
          </div>
        </router-link>
        <router-link
          :to="{ name: 'productCalculator' }"
          class="
            border
            transition
            duration-500
            ease-in-out
            transform
            hover:-translate-y-1
            hover:scale-110
            md:-mt-10
            mt-0
            flex
            items-center
            flex-col
            h-auto
            py-8
            px-8
            md:w-1/3
            w-full
            rounded-md
            shadow-xs
            hover:shadow-2xl
            altaraBlue
          "
        >
          <p
            class="
              text-white
              mb-6
              font-bold
              leading-3
              tracking-wider
              text-base
              lg:text-2xl
            "
          >
            Altara Product
          </p>
          <div class="h-11/12 w-9/12">
            <img
              src="@/assets/img/productloans.png"
              class="object-contain w-full h-full"
            />
          </div>
        </router-link>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import registerBg2 from "@/assets/img/register_bg_2.png";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
    IndexNavbar,
    FooterComponent,
  },
};
</script>

<style>
</style>