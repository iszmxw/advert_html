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
            <el-form-item label="所属计划">
              <el-select
                v-model="form.plan_id"
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
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="所属单元">
              <el-select
                v-model="form.unit_id"
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
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="创意名称">
              <el-input
                v-model="form.idea_name"
                placeholder="请输入创意名称"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告链接地址">
              <el-input
                v-model="form.link"
                placeholder="请输入广告链接地址"
              >
                <el-button
                  slot="append"
                  icon="el-icon-link"
                />
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="广告标题">
              <el-input
                v-model="form.advert_name"
                placeholder="请输入广告标题"
              />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item label="图片">

              <el-upload
                :action="upload_url"
                list-type="picture-card"
                name="files"
                :limit="3"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :before-upload="handleBefore"
                :file-list="form.images"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl">
              </el-dialog>

            </el-form-item>
          </el-col>
        </el-col>

        <el-col :lg="24">
          <el-col :lg="12">
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >确认保存</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import { idea_info, plan_list_data, unit_list_data, idea_edit } from '@/api/advert'

export default {
  data() {
    return {
      plan_options: [],
      unit_options: [],
      form: {
        id: '',
        plan_id: '',
        unit_id: '',
        idea_name: '',
        link: '',
        advert_name: '',
        images: []
      },
      upload_url: 'http://advert.54zm.com/api/admin/advert/image_upload',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.idea_info()
    this.plan_list_data()
  },
  methods: {
    idea_info() {
      idea_info(this.$route.query).then(res => {
        if (res.code === 200) {
          this.form.id = res.data.id
          this.form.plan_id = res.data.plan_id
          this.form.unit_id = res.data.unit_id
          this.form.idea_name = res.data.idea_name
          this.form.link = res.data.link
          this.form.advert_name = res.data.advert_name
          this.form.images = res.data.images
          this.unit_list_data(res.data.plan_id)
        }
      })
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
          this.unit_options = res.data
        }
      })
    },
    onSubmit() {
      idea_edit(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.$router.push({
            path: '/advert/idea_list'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    handleRemove(file, fileList) {
      this.form.images = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, images) {
      this.form.images = images
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleBefore(file) {
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
