<template>
    <div>
        <canvas id="planet-chart"></canvas>
    </div>
</template>

<script>

export default {
  name: "ShowRoomStats",
  props:{
        graphData: {
            type: Object,
            required: true
        }
  }
  ,
  data() {
    return {
      
    }
  },
  mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.graphData);
  }
}
</script>

<style lang="scss" scoped>

</style>