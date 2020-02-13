<template>
  <div class="login-container body">
    <div class="header-wrap">
      <div class="logo"></div>
    </div>
    <div class="body-wrap">

    <div class="body-area1">
      <div class="area1">
        <div class="left">
          <h1>热讯头条广告平台</h1>
          <h1>为您和用户搭建桥梁</h1>
        </div>
        <div class="right">
          <div class="login-form-body">
            <el-form
              v-if="true"
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">登录</h3>
              </div>

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="登录账号"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="登录密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                class="form-login-btn"
                @click.native.prevent="handleLogin"
              >登录</el-button>
            </el-form>
          </div>

        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: initial;

/* reset element-ui css */
.login-container {
  .el-form-item__content {
    border-bottom: 1px solid #eceef4;
  }
  
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background-color: #fff!important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      caret-color: $cursor;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$bg_form: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  // logo
  .header-wrap {
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .04);
    position: relative;
    z-index: 5;
    padding: 0 42px 0 24px;
    height: 72px;
    line-height: 72px;
    display: flex;
    align-items: center
  }

  .header-wrap .ksa-icon.menu-close {
    font-size: 24px;
    color: #868da1
  }

  .header-wrap .ksa-icon.menu-close:hover:before {
    color: #ff5a5e
  }

  .header-wrap .logo {
    background-image: url("../../assets/img/logo-long.jpg");
    width: 270px;
    height: 62px;
    margin-left: 24px;
    margin-right: 15px;
    position: relative;
    background-repeat: no-repeat;
    background-size: contain;
  }
  // 背景
  .body-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 72px;
  }
  .body-area1 {
    width: 100%;
    height: 100%;
    position: relative
  }

  .body-area1 .area1 {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    text-align: center
  }

  .body-area1 .area1 .left,
  .body-area1 .area1 .right {
    flex: 0 0 600px;
    display: inline-block;
    text-align: left;
    box-sizing: border-box
  }

  @media (max-width:1920px) {
    .body-area1 {
      background: url(//static.yximgs.com/s1/static/media/banner-top.00599c3b.png) 50% no-repeat;
      background-size: auto 100%
    }
  }

  @media (min-width:1920px) {
    .body-area1 {
      background: url(//static.yximgs.com/s1/static/media/banner-top.00599c3b.png) 50% no-repeat;
      background-size: 100% 100%
    }
  }

  .body-area1 .left {
    padding-left: 88px
  }

  .body-area1 .left h1 {
    font-family: PingFangSC-Medium;
    font-size: 38px;
    line-height: 40px;
    color: #fff
  }

  .body-area1 .left h1:first-of-type {
    margin-top: 160px
  }

  .body-area1 .left h1:last-of-type {
    margin-bottom: 20px
  }

  .body-area1 .right {
    padding-left: 88px;
    margin-top: 96px
  }

  // 登录框
  .login-form-body {
    width: 430px;
  }
  
  .login-form {
    position: relative;
    max-width: 100%;
    padding: 37px 53px;
    margin: 0 auto;
    background: $bg_form;
    overflow: hidden;
    border-radius: 4px;

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .form-login-btn {
      width:100%;
      line-height: 22px;
      background: #ff5a5e;
      border: none;
      margin: 10px 0 30px 0;
    }
  }
}
</style>
