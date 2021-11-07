<template>
  <div class="flex-1">
    <router-link :to="{ name: 'CashResult', params: { slug: business_type.slug } }">
       <button
        class="
          w-full
          h-full
          flex-1
          border
          focus:outline-none
          font-semibold
          text-base
          rounded-lg
          px-5
          py-2
          bg-white
          group-focus:text-yellow-300
        "
        :class="styleActiveRoute"
        @click="getResultMobile(2, 20)"
      >
        {{ business_type.name }}
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    getResultMobile: {
      type: Function,
      required: true,
    },
    business_type: {
      type: Object,
    },
  },
  computed: {
    styleActiveRoute() {
      if (this.$route.params.slug == this.business_type?.slug) {
        return "bg-red-700 text-white ";
      }
      return "";
    },
  },
};
</script>

<style>
</style>