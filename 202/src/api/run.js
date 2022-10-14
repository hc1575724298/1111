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
    params: {
      protocol_id: id,
    }
  })
}


// 查看门的状态
export function getDoorState () {
  return request({
    url: '/run/get-door-state',
  })
}

// 打开仪器门
export function openDoor () {
  return request({
    url: '/run/open-door',
    method: 'POST',
  })
}

//关闭仪器门
export function closeDoor () {
  return request({
    url: '/run/close-door',
    method: 'POST',
  })
}

// 运行，暂时只创建运行记录
export function setRun (data) {
  return request({
    url: '/run/run',
    method: 'POST',
    data
  })
}
