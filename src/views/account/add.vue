<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="display: inline-block"
      >
        <el-form-item label="账户类型">
          <el-select
            v-model="form.type"
            placeholder="请选择账户类型"
          >
            <el-option
              label="广告主"
              :value="0"
            />
            <el-option
              label="管理员"
              :value="1"
            />
          </el-select>
        </el-form-item>
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item :label="form.type===0?'广告主名称':'管理员名称'">
              <el-input
                v-model="form.name"
                :placeholder="form.type===0?'请输入广告主的名称':'请输入管理员名称'"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item :label="form.type===0?'广告主账户名':'管理员账号'">
              <el-input
                v-model="form.account"
                :placeholder="form.type===0?'请输入广告主的账号，用来登录系统':'请输入管理员的账号，用来登录系统'"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="手机号码">
              <el-input
                v-model="form.mobile"
                placeholder="手机号码，可以为空，由商户自行补充"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="登录密码">
              <el-input
                v-model="form.password"
                placeholder="请输入商户的登录密码"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="确认密码">
              <el-input
                v-model="form.repassword"
                placeholder="请输入商户的登录密码"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >立即创建</el-button>
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
      form: {
        type: 0,
        name: '',
        account: '',
        mobile: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      add(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.$router.push({
            path: '/account/list'
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
