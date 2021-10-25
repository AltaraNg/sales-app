<template>
  <div class="flex-1">
    <router-link :to="{ name: 'CashResult', params: { id: business_type.id } }">
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
        {{ business_names[business_type.slug]|| business_type.name }}
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
        business_names:{
        business5: "Renewal (Collateral)",
        business10:"Renewal (No Collateral)",
        business7:"Starter (Collateral)",
        business9: "Starter (No Collateral)",
        business6: "Employee",
        business8:"Rent"
      
    }
  }
  },
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