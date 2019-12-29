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
