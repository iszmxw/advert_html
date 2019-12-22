import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
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

// 编辑账号
export function edit(data) {
  return request({
    url: '/account/edit',
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
