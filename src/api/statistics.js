import request from '@/utils/request'

// 分日数据
export function statistics_day(data) {
  return request({
    url: '/statistics/statistics_day',
    method: 'post',
    data
  })
}

// 账户列表
export function account_list(data) {
  return request({
    url: '/statistics/account_list',
    method: 'post',
    data
  })
}
