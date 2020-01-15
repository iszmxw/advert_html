<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import { statistics_day } from '@/api/statistics'

import LineChart from './components/LineChart'

const lineChartData = {
  day: {
    day_consume: [],
    show_count: [],
    click_count: [],
    ctr: [],
    show_consume: [],
    date: []
  }
}

export default {
  components: {
    LineChart
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      lineChartData: lineChartData.day
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await statistics_day(this.listQuery)
      this.lineChartData = res.data
    }
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
