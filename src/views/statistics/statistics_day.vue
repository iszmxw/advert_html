<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'

const lineChartData = {
  day: {
    allConsume: [100, 120, 161, 134, 105, 160, 165],
    showCount: [70, 81, 88, 135, 100, 128, 165],
    clickCount: [120, 82, 91, 154, 162, 140, 145],
    ctr: [40.04, 40.3, 39.56, 38.23, 42.89, 50.12, 60],
    showConsume: [0.42, 12.01, 12.14, 15.4, 16.2, 14.23, 14.58]
  }
}

export default {
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.day
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
