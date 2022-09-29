import request from '@/utils/request'
export function searchSetting() {
  return request({
    url: '/setting/all',
    method: 'get',
    query: {}
  })
}

export function saveSetting(params) {
  return request({
    url: '/setting/save',
    method: 'post',
    data: params
  })
}

export function updateSystem(params) {
  return request({
    url: '/setting/update-system-time',
    method: 'post',
    data: params
  })
}
export function getSystemTime() {
  return request({
    url: '/setting/get-system-time',
    method: 'get',
    query: {}
  })
}
