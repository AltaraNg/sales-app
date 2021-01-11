<template>
  <transition name="fade">
    <div class="loader" v-if="$store.state.loader">
      <div class="loader__box">
        <div :key="companyName[i]" v-for="i in companyName" class="loader__dot">
          {{ i }}
        </div>
        <div class="loader__text"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import Auth from "../utilities/auth";

export default {
  data() {
    return {
      companyName: ["A", "L", "T", "A", "R", "A"],
      loader: Auth.toggleLoader,
    };
  },
};
</script>