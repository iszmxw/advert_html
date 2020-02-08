<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form ref="form" :model="form" label-width="120px" style="display: inline-block">
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="投放目的">
              <el-tag>落地页</el-tag>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="* 广告计划名称">
              <el-input v-model="form.name" placeholder="请输入商户的账号，用来登录系统" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="* 投放日期">
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="* 投放预算(元/天)">
              <el-input v-model="form.budget" placeholder="请输入投放预算">
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
              <el-button type="primary" @click="onSubmit('next')">保存并创建单元</el-button>
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
import { plan_add } from '@/api/advert'

export default {
  data() {
    return {
      form: {
        name: '',
        date: '',
        budget: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
    onSubmit(obj) {
      plan_add(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          if (obj === 'next') {
            this.$router.push({
              path: '/advert/unit_add'
            })
          } else {
            this.$router.push({
              path: '/advert/plan_list'
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
