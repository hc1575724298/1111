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
  })
}



export function instrumentGet() {
  return request({
    url: '/setting/get-instrument',
    method: 'get',
  })
}

export function saveInstruments(params) {
  return request({
    url: '/setting/save-instrument',
    method: 'post',
    data: params
  })
}

export function importOem(params) {
  return request({
    url: '/setting/import-image',
    method: 'post',
    data: params
  })
}

export function testCali(params) {
  return request({
    url: '/calibration/start-wdjz',
    method: 'post',
    data: params
  })
}

export function stopCali() {
  return request({
    url: '/calibration/stop-wdjz',
    method: 'post',
  })
}

export function moveYZ(params) {
  return request({
    url: '/worktable/move',
    method: 'post',
    data: params
  })
}

export function searchLabwares(params) {
  return request({
    url: '/labware/search',
    method: 'get',
    params: params
  })
}

export function TestAging(params) {
  return request({
    url: '/setting/aging',
    method: 'post',
    data: params
  })
}
