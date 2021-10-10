<template>
  <div>
    <router-link :to="{ name: 'CashResult', params: { name: business_type.name.replace(/\s/g, '') } }">
      <button
        class="
          w-full
          focus:outline-none
          font-semibold
          lg:text-lg
          text-base
          rounded-lg
          px-5
          py-3
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
      if (this.$route.params.name == this.business_type?.name.replace(/\s/g, '')) {
        return "bg-red-700 text-white ";
      }
      return "";
    },
  },
};
</script>

<style>
</style>