<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form ref="form" :model="form" label-width="90px" style="display: inline-block">
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="所属计划">
              <el-select v-model="form.plan_id" placeholder="请选择计划">
                <el-option
                  v-for="item in plan_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="单元名称">
              <el-input v-model="form.name" placeholder="请输入单元名称" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="投放目的">
              <el-tag>点击</el-tag>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告类型 ">
              <el-select v-model="form.type" placeholder="请选择广告类型">
                <el-option
                  v-for="item in type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="付费方式">
              <el-tag>CPC</el-tag>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="出价">
              <el-input v-model="form.price" placeholder="请输入出价">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :gutter="10">
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存并关闭</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="onSubmit('next')">保存并创建创意</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </el-col>
        </el-col>

      </el-form>
    </div>
  </div>
</template>

<script>
import { plan_list_data, unit_add } from '@/api/advert'

export default {
  data() {
    return {
      plan_options: [],
      type_options: [{
        value: 1,
        label: '信息流列表页'
      }, {
        value: 2,
        label: '信息流详情页'
      }],
      form: {
        plan_id: '',
        name: '',
        type: '',
        price: ''
      }
    }
  },
  created() {
    this.plan_list_data()
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
    plan_list_data() {
      plan_list_data().then(res => {
        if (res.code === 200) {
          this.plan_options = res.data
        }
      })
    },
    onSubmit(obj) {
      unit_add(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          if (obj === 'next') {
            this.$router.push({
              path: '/advert/idea_add'
            })
          } else {
            this.$router.push({
              path: '/advert/unit_list'
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
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
