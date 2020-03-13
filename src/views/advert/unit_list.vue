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
      :to="'/advert/unit_add'"
    >
      <el-button type="primary">新增单元</el-button>
    </router-link>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <span v-if="checkPermission(['isadmin'])">
        <span class="demonstration">选择账户</span>
        <el-select
          v-model="listQuery.account_id"
          filterable
          clearable
          placeholder="请选择"
          @change="plan_list_data"
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
        <span>单元状态</span>
        <el-select
          v-model="listQuery.status"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in unitStatusList"
            :key="index"
            :label="item.name"
            :value="item.status"
          />
        </el-select>
      </span>
      <span>
        <span>单元名称</span>
        <span style="display: inline-block">
          <el-input
            v-model="listQuery.unit_name"
            placeholder="单元名称"
          />
        </span>
      </span>
      <span>
        <span>单元类型</span>
        <el-select
          v-model="listQuery.unit_type"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in type_options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span v-if="listQuery.account_id > 1">
        <span>所属计划</span>
        <el-select
          v-model="listQuery.plan_id"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in plan_options"
            :key="index"
            :label="item.label"
            :value="item.value"
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
      :data="unitList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="单元ID"
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
        label="单元名称"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click.native="toPage('/advert/idea_list', {
              account_id:scope.row.account_id,
              plan_id:scope.row.plan_id,
              unit_id:scope.row.id
            })"
          >
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="类型"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.type == 1"
            type="success"
          >信息流列表页</el-tag>
          <el-tag
            v-if="scope.row.type == 2"
            type="success"
          >信息流详情页</el-tag>
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
        label="出价"
      >
        <template slot-scope="scope">{{ scope.row.price /100 }}元</template>
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

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      title="编辑单元信息"
      width="30%"
    >
      <el-form
        :model="unitdata"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="所属计划">
          <el-select
            v-model="unitdata.plan_id"
            placeholder="请选择计划"
          >
            <el-option
              v-for="item in plan_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单元名称">
          <el-input
            v-model="unitdata.name"
            placeholder="单元名称"
          />
        </el-form-item>
        <el-form-item label="请选择广告类型">
          <el-select
            v-model="unitdata.type"
            placeholder="请选择广告类型"
          >
            <el-option
              v-for="item in type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="出价">
          <el-input
            v-model="unitdata.price"
            placeholder="出价"
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

import { unit_list, unit_delete, unit_edit, plan_list_data, unit_status } from '@/api/advert'
import { account_list } from '@/api/statistics'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  data() {
    return {
      activeIndex: '2',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        status: -1,
        plan_id: null,
        unit_type: null,
        account_id: null,
        unit_name: ''
      },
      account_list: [],
      plan_options: [],
      type_options: [{
        value: 1,
        label: '信息流列表页'
      }, {
        value: 2,
        label: '信息流详情页'
      }],
      unitdata: {
        id: '',
        plan_id: '',
        name: '',
        type: '',
        price: ''
      },
      unitList: [],
      dialogVisible: false,
      unitStatusList: [{
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
    this.listQuery.account_id = this.$route.query.account_id !== undefined ? this.$route.query.account_id : null
    this.listQuery.plan_id = this.$route.query.plan_id !== undefined ? this.$route.query.plan_id : null
    this.getList()
    this.getAccountList()
    this.plan_list_data()
  },
  methods: {
    checkPermission,
    // 获取账户列表
    getAccountList() {
      account_list().then(res => {
        if (res.code === 200) {
          this.account_list = res.data
        }
      })
    },
    SwitchStatus(id) {
      unit_status({ id: id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        }
      })
    },
    plan_list_data() {
      plan_list_data(this.listQuery).then(res => {
        if (res.code === 200) {
          this.plan_options = res.data
        }
      })
    },
    async getList() {
      const res = await unit_list(this.listQuery)
      this.unitList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.unitdata.id = data.id
      this.unitdata.plan_id = data.plan_id
      this.unitdata.name = data.name
      this.unitdata.type = data.type
      this.unitdata.price = data.price / 100
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await unit_edit(this.unitdata)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.dialogVisible = false
        this.getList()
      }
    },
    handelDelete({ $index, row }) {
      this.$confirm('确定要删除该单元吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await unit_delete({ id: row.id })
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
