<template>
  <div class="app-container">
    <div class="app-wrapper">
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
  </div>
</template>

<script>
import { login_log } from '@/api/user'
import Pagination from '@/components/Pagination' // 基于分页的二次封装

export default {
  components: {
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
.app-main {
  padding: 32px;
  background: rgb(240, 242, 245);

  .app-container {
    background-color: rgb(240, 242, 245);
    position: relative;

    .app-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
}
</style>
