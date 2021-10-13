<template>
  <div>
    <router-link :to="{ name: 'CashResult', params: { name: business_type.name.replace(/\s/g, '') } }">
      <button
        class="
          w-full
          h-full
          flex-1
          border
          focus:outline-none
          font-semibold
          md:text-lg
          text-xs
          rounded-lg
          md:px-5
          px-3
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
      if (this.$route.params.name == this.business_type?.name?.replace(/\s/g, '')) {
        return "bg-red-700 text-white ";
      }
      return "";
    },
  },
};
</script>

<style>
</style>