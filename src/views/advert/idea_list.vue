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
            <a
              :href="item"
              target="_blank"
            >查看图片{{ index + 1 }}</a><br>
          </span>
        </template>
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
      title="编辑广告创意"
    >
      <el-form
        :model="ideaData"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="所属计划">
          <el-select
            v-model="ideaData.plan_id"
            placeholder="请选择计划"
            @change="unit_list_data"
          >
            <el-option
              v-for="item in plan_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属单元">
          <el-select
            v-model="ideaData.unit_id"
            placeholder="请选择单元"
          >
            <el-option
              v-for="item in unit_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创意名称">
          <el-input
            v-model="ideaData.idea_name"
            placeholder="请输入创意名称"
          />
        </el-form-item>
        <el-form-item label="广告链接地址">
          <el-input
            v-model="ideaData.link"
            placeholder="请输入广告链接地址"
          >
            <el-button
              slot="append"
              icon="el-icon-link"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="广告标题">
          <el-input
            v-model="ideaData.advert_name"
            placeholder="请输入广告标题"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-input
            v-model="ideaData.images"
            placeholder="请上传图片"
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
          @click="handleOk"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { idea_list, plan_list_data, unit_list_data, idea_edit, idea_delete } from '@/api/advert'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
      plan_options: [],
      unit_options: [],
      ideaData: {
        id: '',
        plan_id: '',
        unit_id: '',
        idea_name: '',
        link: '',
        advert_name: '',
        images: ''
      },
      ideaList: [],
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
    plan_list_data() {
      plan_list_data().then(res => {
        if (res.code === 200) {
          this.plan_options = res.data
        }
      })
    },
    unit_list_data(plan_id) {
      unit_list_data({ plan_id: plan_id }).then(res => {
        if (res.code === 200) {
          this.ideaData.unit_id = ''
          this.unit_options = res.data
        }
      })
    },
    async getList() {
      const res = await idea_list(this.listQuery)
      this.ideaList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.plan_list_data()
      this.ideaData.id = data.id
      this.ideaData.plan_id = data.plan_id
      this.ideaData.unit_id = data.unit_id
      this.ideaData.idea_name = data.idea_name
      this.ideaData.link = data.link
      this.ideaData.advert_name = data.advert_name
      this.ideaData.images = data.images
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await idea_edit(this.ideaData)
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
