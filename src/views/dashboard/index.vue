<template>
  <div class="dashboard-container">

    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div v-if="checkPermission(['isadmin'])">
        <span class="demonstration">选择账户</span>
        <el-select :value="listQuery.account_id" filterable clearable placeholder="请选择" @change="handleSelect">
          <el-option
            v-for="item in account_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <br>
      <div class="block">
        <span class="demonstration">时间</span>
        <el-date-picker
          v-model="listQuery.search_time"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="selectTime"
        />
      </div>
      <line-chart :chart-data="lineChartData" />

      <el-table
        :data="statisticsList"
        style="width: 100%;margin-top:30px;"
        border
      >
        <el-table-column
          align="center"
          label="日期"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="展现数"
        >
          <template slot-scope="scope">
            {{ scope.row.show_count }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="点击数"
        >
          <template slot-scope="scope">{{ scope.row.click_count }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="消费"
        >
          <template slot-scope="scope">
            ￥{{ scope.row.day_consume }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="点击率"
        >
          <template slot-scope="scope">{{ scope.row.ctr }}</template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="点击单价"
        >
          <template slot-scope="scope">￥{{ scope.row.click_price }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="千次展现消费"
        >
          <template slot-scope="scope">
            ￥{{ scope.row.show_consume }}
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
      <br>
      <br>
      <br>
    </el-row>

  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { statistics_day, account_list } from '@/api/statistics'
import PanelGroup from './components/PanelGroup'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

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
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    Pagination
  },
  data() {
    return {
      account_list: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')])
          }
        }]
      },
      lineChartData: lineChartData.day,
      total: 0,
      listQuery: {
        account_id: null,
        page: 1,
        limit: 10,
        search_time: []
      },
      statisticsList: []
    }
  },
  created() {
    this.getAccountList()
    this.initTime()
  },
  methods: {
    checkPermission,
    handleSelect(id) {
      this.listQuery.account_id = id
      this.getList()
    },
    getAccountList() {
      account_list().then(res => {
        if (res.code === 200) {
          this.account_list = res.data
        }
      })
    },
    // 初始化时间
    initTime() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.listQuery.search_time = [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')]
      this.getList()
    },
    async getList() {
      const res = await statistics_day(this.listQuery)
      if (res.code === 200) {
        this.lineChartData = res.data.statistics
        this.statisticsList = res.data.list.data
        this.total = res.data.list.total
      }
    },
    selectTime(time) {
      if (time) {
        this.listQuery.search_time = time
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
