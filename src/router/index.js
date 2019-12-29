import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在路由children.length> = 1时出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项具有多个子路线时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['isadmin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
    icon: 'svg-name'             侧栏中的图标显示
    breadcrumb: false            如果设置为false，则该项将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'  如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色可以访问
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}

]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '系统首页',
      icon: 'dashboard',
      roles: ['isadmin', 'isaccount']
    }
  }]
},

{
  path: '/account',
  component: Layout,
  redirect: '/account/list',
  name: 'isaccount',
  alwaysShow: true,
  meta: {
    title: '账户中心',
    icon: 'people',
    roles: ['isadmin', 'isaccount']
  },
  children: [{
    path: 'add',
    name: 'add',
    component: () => import('@/views/account/add'),
    meta: {
      title: '添加用户',
      roles: ['isadmin']
    }
  },
  {
    path: 'list',
    name: 'list',
    component: () => import('@/views/account/list'),
    meta: {
      title: '用户列表',
      roles: ['isadmin']
    }
  },
  {
    path: 'info',
    name: 'Info',
    component: () => import('@/views/account/info'),
    meta: {
      title: '账户信息',
      roles: ['isaccount']
    }
  }
  ]
},

{
  path: '/advert',
  component: Layout,
  redirect: '/advert/plan_list',
  name: 'Advert',
  alwaysShow: true,
  meta: {
    title: '推广管理',
    icon: 'example',
    roles: ['isadmin', 'isaccount']
  },
  children: [{
    path: 'plan_list',
    name: 'plan_list',
    component: () => import('@/views/advert/plan_list'),
    meta: {
      title: '广告计划',
      roles: ['isaccount']
    }
  },
  {
    path: 'plan_add',
    name: 'plan_add',
    component: () => import('@/views/advert/plan_add'),
    hidden: true,
    meta: {
      title: '新增推广计划',
      roles: ['isaccount']
    }
  },
  {
    path: 'unit_list',
    name: '广告单元',
    component: () => import('@/views/advert/unit_list'),
    meta: {
      title: '广告单元',
      roles: ['isaccount']
    }
  },
  {
    path: 'unit_add',
    name: 'unit_add',
    component: () => import('@/views/advert/unit_add'),
    hidden: true,
    meta: {
      title: '新增广告单元',
      roles: ['isaccount']
    }
  },
  {
    path: 'idea_list',
    name: '广告创意',
    component: () => import('@/views/advert/idea_list'),
    meta: {
      title: '广告创意',
      roles: ['isaccount']
    }
  },
  {
    path: 'idea_add',
    name: 'idea_add',
    component: () => import('@/views/advert/idea_add'),
    hidden: true,
    meta: {
      title: '新增广告创意',
      roles: ['isaccount']
    }
  }
  ]
},
{
  path: 'external-link',
  component: Layout,
  meta: {
    roles: ['isadmin', 'isaccount']
  },
  children: [{
    path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    meta: {
      title: '外部链接',
      icon: 'link',
      roles: ['isadmin', 'isaccount']
    }
  }]
},

// 404页必须放在最后！
{
  path: '*',
  redirect: '/404',
  hidden: true
}

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
