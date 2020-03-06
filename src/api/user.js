import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 登录日志
export function login_log(data) {
  return request({
    url: '/login_log',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/user_info',
    method: 'get',
    params: { token }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 添加账号
export function add(data) {
  return request({
    url: '/account/add',
    method: 'post',
    data
  })
}

// 账号列表
export function getList(data) {
  return request({
    url: '/account/list',
    method: 'post',
    data
  })
}

// 超级管理员编辑账户
export function edit(data) {
  return request({
    url: '/account/edit',
    method: 'post',
    data
  })
}

// 账户修改自己的信息
export function edit_info(data) {
  return request({
    url: '/account/edit_info',
    method: 'post',
    data
  })
}

// 修改账号密码
export function password(data) {
  return request({
    url: '/account/password',
    method: 'post',
    data
  })
}

// 冻结账号
export function lockStatus(data) {
  return request({
    url: '/account/status',
    method: 'post',
    data
  })
}

// 账号脚本状态修改
export function scriptStatus(data) {
  return request({
    url: '/account/script_status',
    method: 'post',
    data
  })
}

// 系统首页
export function dashboard(data) {
  return request({
    url: '/dashboard',
    method: 'post',
    data
  })
}

// 获取账户信息
export function getAccountInfo(data) {
  return request({
    url: '/account/info',
    method: 'post',
    data
  })
}
