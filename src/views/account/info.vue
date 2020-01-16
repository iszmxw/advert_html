<template>
  <div class="app-container">
    <div class="app-wrapper">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="display: inline-block"
      >
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告主名称">
              <el-input
                v-model="form.name"
                placeholder="广告主名称"
                disabled="disabled"
              />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告主账户名">
              <el-input
                v-model="form.account"
                placeholder="广告主账户名"
                disabled="disabled"
              />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="公司名称">
              <el-input
                v-model="form.company_name"
                placeholder="公司名称"
                disabled="disabled"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="邮箱">
              <el-input
                v-model="form.email"
                placeholder="邮箱"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="资质证明">

              <el-upload
                :action="upload_url"
                list-type="picture-card"
                name="files"
                :limit="1"
                :on-exceed="handleProveExceed"
                :on-change="handleProveChange"
                :before-upload="handleProveBefore"
                :file-list="form.images_prove"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleProveRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img
                  width="100%"
                  :src="dialogImageUrl"
                >
              </el-dialog>

            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label=" 营业执照">

              <el-upload
                :action="upload_url"
                list-type="picture-card"
                name="files"
                :limit="1"
                :on-exceed="handleLicenseExceed"
                :on-change="handleLicenseChange"
                :before-upload="handleLicenseBefore"
                :file-list="form.images_license"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleLicenseRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img
                  width="100%"
                  :src="dialogImageUrl"
                >
              </el-dialog>

            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="营业执照统一社会信用代码">
              <el-input
                v-model="form.company_code"
                placeholder="请输入营业执照统一社会信用代码"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="联系人姓名">
              <el-input
                v-model="form.nickname"
                placeholder="请输入联系人姓名"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="联系电话">
              <el-input
                v-model="form.mobile"
                placeholder="财务结算时有效的联系电话"
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
import { getAccountInfo, edit_info } from '@/api/user'

export default {
  data() {
    return {
      form: {
        type: 2,
        account: '',
        name: '',
        company_name: '',
        email: '',
        password: '',
        repassword: '',
        images_prove: [],
        images_license: [],
        company_code: '',
        nickname: '',
        mobile: ''
      },
      upload_url: window.location.origin === 'http://localhost:9528' ? window.location.origin : window.location.origin + '/api/admin/advert/image_upload',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getAccountInfo().then(res => {
        if (res.code === 200) {
          this.form = res.data
        }
      })
    },
    onSubmit() {
      edit_info(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.$router.push({
            path: '/account/info'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleProveRemove(file, fileList) {
      this.form.images_prove = fileList
    },
    handleLicenseRemove(file, fileList) {
      this.form.images_license = fileList
    },
    handleProveChange(file, images) {
      this.form.images_prove = images
    },
    handleLicenseChange(file, images) {
      this.form.images_license = images
    },
    handleProveExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleLicenseExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleProveBefore(file) {
      if (file.type.indexOf('image') === -1) {
        this.$message('选择正确的图片格式')
        return false
      }
    },
    handleLicenseBefore(file) {
      if (file.type.indexOf('image') === -1) {
        this.$message('选择正确的图片格式')
        return false
      }
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
