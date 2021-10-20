<template>
  <div>
    <router-link :to="{ name: 'CashResult', params: { id: business_type.id } }">
       <button
        class="
          w-full
          h-full
          flex-1
          border
          focus:outline-none
          font-semibold
          lg:text-base
          text-xs
          rounded-lg
          lg:px-5
          px-3
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
      if (this.$route.params.id == this.business_type?.id) {
        return "bg-red-700 text-white ";
      }
      return "";
    },
  },
};
</script>

<style>
</style>