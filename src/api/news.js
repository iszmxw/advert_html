import request from '@/utils/request'

// 新闻列表
export function news_list(data) {
  return request({
    url: '/news/news_list',
    method: 'post',
    data
  })
}

// 新闻详情
export function news_detail(data) {
  return request({
    url: '/news/news_detail',
    method: 'post',
    data
  })
}
