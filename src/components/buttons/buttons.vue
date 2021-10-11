<template>
  <div>
    <router-link :to="{ name: 'Result', params: { name: rpayDuration.name } }">
      <button
        class="
          w-full
          focus:outline-none
          font-semibold
          md:text-lg
          text-xs
          rounded-lg
          md:px-5
          px-5
          py-3
          bg-white
          group-focus:text-yellow-300
        "
        :class="styleActiveRoute"
        @click="getResultMobile(2, 20)"
      >
        {{ rpayDuration.name }}
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
    rpayDuration: {
      type: Object,
    },
  },
  computed: {
    styleActiveRoute() {
      if (this.$route.params.name == this.rpayDuration?.name) {
        return "bg-red-700 text-white ";
      }
      return "";
    },
  },
};
</script>

<style>
</style>