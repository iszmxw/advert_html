import request from '@/utils/request'

// 新增推广计划
export function plan_add(data) {
  return request({
    url: '/advert/plan_add',
    method: 'post',
    data
  })
}

// 广告计划列表
export function get_plan_list(data) {
  return request({
    url: '/advert/plan_list',
    method: 'post',
    data
  })
}

// 广告计划列表
export function plan_edit(data) {
  return request({
    url: '/advert/plan_edit',
    method: 'post',
    data
  })
}

// 删除广告计划
export function plan_delete(data) {
  return request({
    url: '/advert/plan_delete',
    method: 'post',
    data
  })
}

// 新增广告单元
export function unit_add(data) {
  return request({
    url: '/advert/unit_add',
    method: 'post',
    data
  })
}

// 删除广告单元
export function unit_delete(data) {
  return request({
    url: '/advert/unit_delete',
    method: 'post',
    data
  })
}

// 删除广告单元
export function unit_edit(data) {
  return request({
    url: '/advert/unit_edit',
    method: 'post',
    data
  })
}

// 广告单元列表
export function unit_list(data) {
  return request({
    url: '/advert/unit_list',
    method: 'post',
    data
  })
}

// 获取所属计划列表
export function plan_list_data(data) {
  return request({
    url: '/advert/plan_list_data',
    method: 'post',
    data
  })
}

// 获取所属单元列表
export function unit_list_data(data) {
  return request({
    url: '/advert/unit_list_data',
    method: 'post',
    data
  })
}

// 新增广告创意
export function idea_add(data) {
  return request({
    url: '/advert/idea_add',
    method: 'post',
    data
  })
}

// 删除广告创意
export function idea_delete(data) {
  return request({
    url: '/advert/idea_delete',
    method: 'post',
    data
  })
}

// 广告创意列表
export function idea_list(data) {
  return request({
    url: '/advert/idea_list',
    method: 'post',
    data
  })
}

// 单条广告创意信息获取
export function idea_info(data) {
  return request({
    url: '/advert/idea_info',
    method: 'post',
    data
  })
}

// 编辑单条广告创意信息
export function idea_edit(data) {
  return request({
    url: '/advert/idea_edit',
    method: 'post',
    data
  })
}

// 广告审核
export function idea_check(data) {
  return request({
    url: '/advert/idea_check',
    method: 'post',
    data
  })
}

