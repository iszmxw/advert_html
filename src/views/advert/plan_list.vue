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
      tag="a"
      :to="'/advert/plan_add'"
    >
      <el-button type="primary">新增计划</el-button>
    </router-link>

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
        align="header-center"
        label="计划名称"
      >
        <template slot-scope="scope">{{ scope.row.name }}</template>
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
        label="投放预算"
      >
        <template slot-scope="scope">{{ scope.row.budget / 100 }} 元</template>
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
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="danger"
            size="small"
            @click="handleLock(scope)"
          >冻结</el-button>
          <el-button
            v-else
            type="success"
            size="small"
            @click="handleLock(scope)"
          >解冻</el-button>
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
          @click="dialogVisible=false"
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
import { get_plan_list } from '@/api/advert'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      activeIndex: '1',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      plan: {
        id: '',
        name: '',
        date: '',
        budget: ''
      },
      planList: [],
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    async getList() {
      const res = await get_plan_list(this.listQuery)
      this.planList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.plan.id = data.id
      this.plan.name = data.company
      this.plan.mobile = data.mobile
      this.plan.fee = data.fee
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await edit(this.plan)
      if (res.code === 20000) {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.dialogVisible = false
        this.getList()
      }
    },
    handleLock({ $index, row }) {
      this.$confirm('确定要冻结该商户吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await lockStatus({ id: row.id })
          if (res.code === 20000) {
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
