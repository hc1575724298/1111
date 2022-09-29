import request from '@/utils/request'
/**
 * 获取程序列表
 * @returns
 */
export function getAllProtocol () {
  return request({
    url: '/protocol/all',
  })
}
// 查询程序详情
export function getProtocolDetail (id) {
  return request({
    url: '/protocol/get',
    query: {
      id
    }
  })
}
