<template>
  <div>
    <sidebar />
    <div class="relative md:ml-56 bg-white">
      <header-stats v-if="currentRouteName === 'Dashboard'"/>
      <div class="px-4 md:px-10 mx-auto w-full m-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { eventBus } from "../main";


import HeaderStats from "@/components/Headers/HeaderStats.vue";
export default {
  name: "admin-layout",
  mounted() {
     eventBus.$on("userStats", (data) => {
      this.stats = data
    });
  },
  components: {
    Sidebar,
    HeaderStats,
  },
  data() {
    return {
      stats: {}
    }
  },
  computed : {
    currentRouteName(){
      return this.$route.name;
    }
  }
 
 
};
</script>
