<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        style="display: inline-block"
      >
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="请输入当前密码">
              <el-input
                v-model="form.old_password"
                placeholder="请输入当前密码"
              />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="请您输入新的密码">
              <el-input
                v-model="form.password"
                placeholder="请您输入新的密码"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="再次确认密码">
              <el-input
                v-model="form.repassword"
                placeholder="再次确认密码"
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
              >确定修改</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import { password } from '@/api/user'

export default {
  data() {
    return {
      form: {
        old_password: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      password(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.$router.push({
            path: '/dashboard'
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
