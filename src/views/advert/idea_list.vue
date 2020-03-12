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
      :to="'/advert/idea_add'"
    >
      <el-button type="primary">新增创意</el-button>
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
        <span class="demonstration">审核状态</span>
        <el-select
          v-model="listQuery.is_check"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in ideaStatusList"
            :key="index"
            :label="item.name"
            :value="item.status"
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
          @change="unit_list_data"
        >
          <el-option
            v-for="(item, index) in plan_options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span v-if="listQuery.account_id > 1 && listQuery.plan_id > 0">
        <span>所属单元</span>
        <el-select
          v-model="listQuery.unit_id"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in unit_options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span>
        <span>创意名称</span>
        <span style="display: inline-block">
          <el-input
            v-model="listQuery.idea_name"
            clearable
            placeholder="创意名称"
          />
        </span>
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
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_check == 0"
            type="warning"
            plain
            disabled
          >待审核</el-button>
          <el-button
            v-if="scope.row.is_check == 1"
            type="success"
            plain
            disabled
          >已通过</el-button>
          <el-button
            v-if="scope.row.is_check == 2"
            type="danger"
            plain
            disabled
          >未通过</el-button>
          <br>
          <span v-if="scope.row.is_check == 2">原因：{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="开启状态"
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

      <!-- <el-table-column
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
      </el-table-column> -->

      <el-table-column
        align="header-center"
        label="广告预览"
      >
        <template slot-scope="scope">
          <div class="ad-preview">
            <span>{{ scope.row.advert_name }}</span>
            <span
              v-for="(item,index) in scope.row.complete_paths"
              :key="index"
            >
              <el-tooltip class="item">
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
            <a
              :href="scope.row.link"
              target="_blank"
            >预览广告内容</a>
          </div>
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
          <div v-if="checkPermission(['isadmin'])">
            <el-button
              v-if="scope.row.is_check === 0"
              type="primary"
              size="small"
              @click="handleCheckModal(scope.row)"
            >审核</el-button>
            <el-button
              v-else
              size="small"
            >已处理</el-button>
          </div>
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
      title="审核广告创意"
      width="30%"
    >
      <el-form
        :model="checkdata"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="审核广告创意">
          <el-select
            v-model="checkdata.is_check"
            placeholder="请审核"
          >
            <el-option
              label="待审核"
              :value="0"
            />
            <el-option
              label="审核通过"
              :value="1"
            />
            <el-option
              label="审核拒绝"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="checkdata.is_check === 2"
          label="拒绝原因"
        >
          <el-input
            v-model="checkdata.remark"
            placeholder="理由"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="dialogVisible=false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleCheck"
        >确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { idea_list, idea_delete, idea_check, idea_status, plan_list_data, unit_list_data } from '@/api/advert'
import { account_list } from '@/api/statistics'
import Pagination from '@/components/Pagination' // 基于分页的二次封装
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: { Pagination },
  data() {
    return {
      url: window.location.origin === 'http://localhost:9528' ? window.location.origin : window.location.origin + '/admin',
      activeIndex: '3',
      total: 0,
      listQuery: {
        account_id: null,
        plan_id: null,
        unit_id: null,
        idea_name: null,
        is_check: 0,
        page: 1,
        limit: 10
      },
      plan_options: [],
      unit_options: [],
      checkdata: {
        id: null,
        is_check: 0,
        remark: null
      },
      dialogVisible: false,
      ideaList: [],
      account_list: [],
      ideaStatusList: [{
        status: -1,
        name: '全部'
      }, {
        status: 0,
        name: '待审核'
      }, {
        status: 1,
        name: '已通过'
      }, {
        status: 2,
        name: '未通过'
      }]
    }
  },
  created() {
    this.listQuery.is_check = this.$route.query.status !== undefined ? this.$route.query.status : -1
    this.listQuery.account_id = this.$route.query.account_id !== undefined ? this.$route.query.account_id : null
    this.listQuery.plan_id = this.$route.query.plan_id !== undefined ? this.$route.query.plan_id : null
    this.listQuery.unit_id = this.$route.query.unit_id !== undefined ? this.$route.query.unit_id : null
    this.getAccountList()
    this.getList()
    this.plan_list_data()
    this.unit_list_data()
  },
  methods: {
    checkPermission,
    plan_list_data() {
      plan_list_data(this.listQuery).then(res => {
        if (res.code === 200) {
          this.plan_options = res.data
        }
      })
    },
    unit_list_data() {
      unit_list_data(this.listQuery).then(res => {
        if (res.code === 200) {
          this.unit_options = res.data
        }
      })
    },
    getAccountList() {
      account_list().then(res => {
        if (res.code === 200) {
          this.account_list = res.data
        }
      })
    },
    SwitchStatus(id) {
      idea_status({ id: id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        }
        this.getList()
      })
    },
    handleEdit(data) {
      window.open(this.url + '/#/advert/idea_edit?id=' + data.id)
    },
    handleCheckModal(data) {
      this.checkdata.id = data.id
      this.checkdata.is_check = data.is_check
      this.checkdata.remark = data.remark
      this.dialogVisible = true
    },
    handleCheck() {
      this.$confirm('确定要审核该广告创意吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await idea_check(this.checkdata)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.dialogVisible = false
            this.getList()
          }
        })
        .catch(err => { console.error(err) })
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

  .ad-preview {
    display: flex;
    flex-flow: column;

    & > a {
      color: #0098ac;
    }
  }
}
</style>
