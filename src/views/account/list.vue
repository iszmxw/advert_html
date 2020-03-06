<template>
  <div class="app-container">
    <el-button type="primary">合作商户列表</el-button>
    <el-table :data="accountList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="账户名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="账户类型">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type == 1" type="success" size="mini">管理员</el-button>
          <el-button v-else type="danger" size="mini">合作商户</el-button>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="账户余额">
        <template slot-scope="scope">{{ scope.row.amount / 100 }} 元</template>
      </el-table-column>
      <el-table-column align="header-center" label="登录账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="状态" width="90">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" disabled>正常</el-button>
          <el-button v-else type="danger" disabled>冻结</el-button>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="注册时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
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
          <el-link type="primary" :href="href+'/index.html?user_id=' + scope.row.id" target="_blank">
            <el-button
              type="success"
              size="small"
            >模拟登录</el-button>
          </el-link>

        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="自动脚本开关"
        width="80"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.script_status"
            :active-value="1"
            :inactive-value="0"
            @change="SwitchStatus(scope.row.id)"
          />
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

    <el-dialog :visible.sync="dialogVisible" title="编辑用户信息">
      <el-form :model="account" label-width="120px" label-position="left">
        <el-form-item label="账户名称">
          <el-input v-model="account.name" placeholder="账户名称" />
        </el-form-item>
        <el-form-item label="账户类型">
          <el-tag v-if="account.type === 1" type="success">管理员</el-tag>
          <el-tag v-if="account.type === 2" type="danger">合作商户</el-tag>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="account.nickname" placeholder="联系人姓名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="account.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="账户余额">
          <el-input v-model="account.amount" placeholder="账户余额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="重置密码">
          <el-input v-model="account.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, edit, lockStatus, scriptStatus } from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
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
      account: {
        id: '',
        name: '',
        type: '',
        amount: '',
        account: '',
        nickname: '',
        mobile: ''
      },
      accountList: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    SwitchStatus(id) {
      scriptStatus({ id: id }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        }
      })
    },
    async getList() {
      const res = await getList(this.listQuery)
      this.accountList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.account.id = data.id
      this.account.name = data.name
      this.account.type = data.type
      this.account.amount = data.amount / 100
      this.account.account = data.account
      this.account.nickname = data.nickname
      this.account.mobile = data.mobile
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await edit(this.account)
      if (res.code === 200) {
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
