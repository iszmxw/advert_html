<template>
  <div class="app-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link
          style="display: inline-block"
          tag="a"
          :to="'/advert/plan_list'"
        >计划列表</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
          style="display: inline-block"
          tag="a"
          :to="'/advert/unit_list'"
        >单元列表</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link
          style="display: inline-block"
          tag="a"
          :to="'/advert/idea_list'"
        >创意列表</router-link>
      </el-menu-item>
    </el-menu>
    <br>
    <br>

    <router-link
      v-if="checkPermission(['isaccount'])"
      tag="a"
      :to="'/advert/idea_add'"
    >
      <el-button type="primary">新增创意</el-button>
    </router-link>

    <el-table
      :data="ideaList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="创意ID"
        width="80"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        v-if="checkPermission(['isadmin'])"
        align="center"
        label="所属商户"
      >
        <template slot-scope="scope">{{ scope.row.account_name }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="success"
            disabled
          >已开启</el-button>
          <el-button
            v-else
            type="danger"
            disabled
          >待开启</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="所属计划"
      >
        <template slot-scope="scope">{{ scope.row.plan_name }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="所属单元"
      >
        <template slot-scope="scope">{{ scope.row.unit_name }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="创意名称"
      >
        <template slot-scope="scope">{{ scope.row.idea_name }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="链接地址"
      >
        <template slot-scope="scope">{{ scope.row.link }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="广告创意标题"
      >
        <template slot-scope="scope">{{ scope.row.advert_name }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="广告图片"
      >
        <template slot-scope="scope">
          <span
            v-for="(item,index) in scope.row.complete_paths"
            :key="index"
          >
            <el-tooltip
              class="item"
            >
              <img
                :src="item"
                alt="查看大图"
                style="width:60px;height:50px;padding-right:5px"
              >
              <div slot="content">
                <img
                  :src="item"
                  style="width:100%;height:100%;padding:5px"
                >
              </div>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="添加时间"
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
            v-if="checkPermission(['isaccount'])"
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="checkPermission(['isadmin'])"
            type="primary"
            size="small"
            @click="handleCheck(scope.row)"
          >审核</el-button>
          <el-button
            v-if="checkPermission(['isaccount'])"
            type="danger"
            size="small"
            @click="handleDelete(scope)"
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
import { idea_list, idea_delete } from '@/api/advert'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  data() {
    return {
      activeIndex: '3',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      ideaList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    handleEdit(data) {
      window.open(window.location.origin + '/#/advert/idea_edit?id=' + data.id)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    async getList() {
      const res = await idea_list(this.listQuery)
      this.ideaList = res.data.data
      this.total = res.data.total
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该广告创意吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await idea_delete({ id: row.id })
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
