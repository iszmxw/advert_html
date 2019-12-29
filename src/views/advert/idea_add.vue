<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form ref="form" :model="form" label-width="100px" style="display: inline-block">
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
            <el-form-item label="所属单元">
              <el-select v-model="form.unit_id" placeholder="请选择单元">
                <el-option
                  v-for="item in unit_options"
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
            <el-form-item label="创意名称">
              <el-input v-model="form.idea_name" placeholder="请输入创意名称" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告链接地址">
              <el-input v-model="form.link" placeholder="请输入广告链接地址">
                <el-button slot="append" icon="el-icon-link" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告标题">
              <el-input v-model="form.advert_name" placeholder="请输入广告标题" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="图片">
              <el-input v-model="form.images" placeholder="请上传图片" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import { add } from '@/api/user'

export default {
  data() {
    return {
      plan_options: [{
        value: 1,
        label: 'A计划'
      }, {
        value: 2,
        label: 'B计划'
      }, {
        value: 3,
        label: 'C计划'
      }],
      unit_options: [{
        value: 1,
        label: 'A单元'
      }, {
        value: 2,
        label: 'B单元'
      }, {
        value: 3,
        label: 'C单元'
      }],
      form: {
        plan_id: '',
        unit_id: '',
        idea_name: '',
        link: '',
        advert_name: '',
        images: ''
      }
    }
  },
  methods: {
    onSubmit() {
      add(this.form).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.$router.push({
            path: '/merchant/list'
          })
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
