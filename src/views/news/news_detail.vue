<template>
  <div class="app-container">
    <el-page-header :content="newsDetail.title" @back="goBack" />
    <el-divider content-position="right">{{ newsDetail.date }}</el-divider>

    <div class="category">
      <el-tag>{{ newsDetail.category }}</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-tag type="success">{{ newsDetail.author_name }}</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-link type="primary" :href="newsDetail.url" target="_blank">查看原文</el-link>
    </div>
    <br>
    <br>
    <div class="content" v-html="newsDetail.content" />
    <el-divider><i class="el-icon-mobile-phone" /></el-divider>

  </div>
</template>

<script>
import { news_detail } from '@/api/news'
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  data() {
    return {
      newsDetail: ''
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    checkPermission,
    async getDetail() {
      const res = await news_detail(this.$route.query)
      if (res.code === 200) {
        this.newsDetail = res.data
      }
    },
    goBack() {
      this.$router.push('/news/news_list')
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
