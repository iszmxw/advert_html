<template>
  <div class="app-container">
    <el-table
      :data="newsList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="文章ID"
        width="80"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="标题"
        width="400"
      >
        <template slot-scope="scope">
          <el-link type="primary" :href="href+'/#/news/news_detail?id=' + scope.row.id" target="_blank">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="栏目"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.category }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="来源"
        width="140"
      >
        <template slot-scope="scope">
          <el-link type="success" :href="scope.row.url" target="_blank">{{ scope.row.author_name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="发布时间"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="采集同步时间"
      >
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click="handelDelete(scope)"
          >删除</el-button>
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

  </div>
</template>

<script>
import { news_list, news_delete } from '@/api/news'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  data() {
    return {
      href: window.location.origin === 'http://localhost:9528' ? window.location.origin : window.location.origin + '/admin',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      newsList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    async getList() {
      const res = await news_list(this.listQuery)
      this.newsList = res.data.data
      this.total = res.data.total
    },
    handelDelete({ $index, row }) {
      this.$confirm('确定要删除该新闻吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await news_delete({ id: row.id })
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          }
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
