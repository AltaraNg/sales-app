<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <SuperAdmin />
      </div>
    </div>
  </div>
</template>
<script>
import SuperAdmin from "@/components/Cards/SuperAdmin.vue";
export default {
  name: "dashboard-page",
  components: {
    SuperAdmin,
  },
};
</script>
