<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="headImg" class="user-avatar">
          <span class="user-name">{{ accountInfo.name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link
            v-if="checkPermission(['isaccount'])"
            to="/account/info"
          >
            <el-dropdown-item>
              账户中心
            </el-dropdown-item>
          </router-link>
          <router-link
            v-if="checkPermission(['isadmin'])"
            to="/account/list"
          >
            <el-dropdown-item>
              用户列表
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getAccountInfo } from '@/api/user'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import images1 from '@/assets/img/logo2.jpg'
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      headImg: images1,
      accountInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'roles'
    ])
  },
  created() {
    if (this.roles[0] !== 'isadmin') {
      this.getDataAccountInfo()
    }
  },
  methods: {
    checkPermission,
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    getDataAccountInfo() {
      getAccountInfo().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.accountInfo = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-name {
          margin: 0 4px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
