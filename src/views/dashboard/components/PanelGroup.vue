<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      v-permission="['isadmin']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      @click.native="toPage('account/list')"
    >

      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-green">
          <svg-icon
            icon-class="peoples"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数量
          </div>
          <count-to
            :start-val="0"
            :end-val="data.account_num"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isadmin']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      @click.native="toPage('/advert/idea_list')"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-blue">
          <svg-icon
            icon-class="example"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            广告数量
          </div>
          <count-to
            :start-val="0"
            :end-val="data.advert_num"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isadmin']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      @click.native="toPage('/advert/idea_list', { status: 0 })"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-warning">
          <svg-icon
            icon-class="skill"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待审核广告
          </div>
          <count-to
            :start-val="0"
            :end-val="data.adverting_num"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isadmin']"
      class="card-panel-col"
      :xs="12"
      :sm="12"
      :lg="6"
      @click.native="toPage('/advert/idea_list', { status: 2 })"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-red">
          <svg-icon
            icon-class="bug"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            未通过广告
          </div>
          <count-to
            :start-val="0"
            :end-val="data.unadvert_num"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isaccount']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-red">
          <svg-icon
            icon-class="money"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            账户余额（元）
          </div>
          <count-to
            :start-val="0"
            :decimals="2"
            :end-val="data.amount"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isaccount']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-green">
          <svg-icon
            icon-class="eye"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日总展现（次）
          </div>
          <count-to
            :start-val="0"
            :end-val="data.view_num"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isaccount']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-blue">
          <svg-icon
            icon-class="education"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日总点击（次）
          </div>
          <count-to
            :start-val="0"
            :end-val="data.click_num"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isaccount']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-red">
          <svg-icon
            icon-class="money"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日总花费（元）
          </div>
          <count-to
            :start-val="0"
            :decimals="2"
            :end-val="data.spend"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      v-permission="['isaccount']"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-green">
          <svg-icon
            icon-class="chart"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            平均点击率（%）
          </div>
          <count-to
            :start-val="0"
            :decimals="2"
            :end-val="data.click_avg"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import permission from '@/directive/permission/index.js' // 权限判断指令
import { dashboard } from '@/api/user'
export default {
  components: {
    CountTo
  },
  directives: { permission },
  data() {
    return {
      data: {
        account_num: 0,
        advert_num: 0,
        adverting_num: 0,
        unadvert_num: 0,
        view_num: 0,
        click_num: 0,
        spend: 0,
        click_avg: 0
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      dashboard().then(res => {
        if (res.code === 200) {
          this.data = res.data
        }
      })
    },
    // path 跳转路径 params 参数
    toPage(path = '/', params = {}) {
      this.$router.push({ path: path, query: params })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-blue {
        background: #36a3f7;
      }
      .icon-red {
        background: #f4516c;
      }
      .icon-green {
        background: #34bfa3;
      }
      .icon-warning {
        background: #ffba00;
      }
    }
    .icon-blue {
      color: #36a3f7;
    }
    .icon-red {
      color: #f4516c;
    }
    .icon-green {
      color: #34bfa3;
    }
    .icon-warning {
      color: #ffba00;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
