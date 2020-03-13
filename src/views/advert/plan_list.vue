<template>
  <div class="app-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
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
      :to="'/advert/plan_add'"
    >
      <el-button type="primary">新增计划</el-button>
    </router-link>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <span v-if="checkPermission(['isadmin'])">
        <span class="demonstration">选择账户</span>
        <el-select
          v-model="listQuery.account_id"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in account_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span>
        <span>计划名称</span>
        <span style="display: inline-block">
          <el-input
            v-model="listQuery.plan_name"
            placeholder="计划名称"
          />
        </span>
      </span>
      <span>
        <span>计划状态</span>
        <el-select
          v-model="listQuery.status"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in planStatusList"
            :key="index"
            :label="item.name"
            :value="item.status"
          />
        </el-select>
      </span>
      <span>
        <el-button
          type="primary"
          size="small"
          @click="getList()"
        >筛选</el-button>
      </span>
    </el-row>

    <el-table
      :data="planList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="计划ID"
        width="80"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="开关"
        width="80"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="SwitchStatus(scope.row.id)"
          />
        </template>
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
        label="计划名称"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click.native="toPage('/advert/unit_list', {
              account_id:scope.row.account_id,
              plan_id:scope.row.id
            })"
          >
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="开始日期"
      >
        <template slot-scope="scope">{{ scope.row.start_time }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="结束日期"
      >
        <template slot-scope="scope">{{ scope.row.end_time }}</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="投放预算（元/天）"
      >
        <template slot-scope="scope">{{ scope.row.budget / 100 }} 元</template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="添加时间"
      >
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column
        v-if="checkPermission(['isaccount'])"
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

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      title="编辑广告计划"
    >
      <el-form
        :model="plan"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="计划名称">
          <el-input
            v-model="plan.name"
            placeholder="计划名称"
          />
        </el-form-item>
        <el-form-item label="投放日期">
          <el-date-picker
            v-model="plan.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="投放预算">
          <el-input
            v-model="plan.budget"
            placeholder="投放预算"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="handleClose"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleOk"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { get_plan_list, plan_edit, plan_delete, plan_status } from '@/api/advert'
import { account_list } from '@/api/statistics'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  data() {
    return {
      activeIndex: '1',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        status: -1,
        account_id: null,
        plan_name: ''
      },
      plan: {
        id: '',
        name: '',
        date: [],
        budget: ''
      },
      planList: [],
      account_list: [],
      dialogVisible: false,
      planStatusList: [{
        status: -1,
        name: '全部'
      }, {
        status: 0,
        name: '待开启'
      }, {
        status: 1,
        name: '已开启'
      }]
    }
  },
  created() {
    this.getList()
    this.getAccountList()
  },
  methods: {
    checkPermission,
    getAccountList() {
      account_list().then(res => {
        if (res.code === 200) {
          this.account_list = res.data
        }
      })
    },
    SwitchStatus(id) {
      plan_status({ id: id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    async getList() {
      const res = await get_plan_list(this.listQuery)
      this.planList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.plan.date = []
      this.plan.id = data.id
      this.plan.name = data.name
      this.plan.date[0] = data.start_time
      this.plan.date[1] = data.end_time
      this.plan.budget = data.budget / 100
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await plan_edit(this.plan)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.dialogVisible = false
        this.getList()
      }
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该计划吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await plan_delete({ id: row.id })
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          }
        })
        .catch(err => { console.error(err) })
    },
    // path 跳转路径 params 参数
    toPage(path = '/', params = {}) {
      this.$router.push({ path: path, query: params })
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
