import request from '@/utils/request'

// 分日数据
export function statistics_day(data) {
  return request({
    url: '/statistics/statistics_day',
    method: 'post',
    data
  })
}
