<template>
  <div class="dashboard-container">

    <panel-group />
    <el-table
      :data="loginLog"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="ID"
        width="80"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="登录账号"
      >
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="身份"
      >
        <template slot-scope="scope">{{ scope.row.role }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="IP"
        width="400"
      >
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="地址"
        width="400"
      >
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="登录时间"
      >
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { login_log } from '@/api/user'
import PanelGroup from './components/PanelGroup'
import Pagination from '@/components/Pagination' // 基于分页的二次封装

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loginLog: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await login_log(this.listQuery)
      this.loginLog = res.data.data
      this.total = res.data.total
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
