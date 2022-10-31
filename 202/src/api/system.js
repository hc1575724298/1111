import request from '@/utils/request'

export function getLightState() {
  return request({
    url: '/run/get-light-state',
    method: 'get',
  })
}

export function closeLight() {
  return request({
    url: '/run/close-light',
    method: 'post',
  })
}

export function openLight() {
  return request({
    url: '/run/api/run',
    method: 'post',
  })
}
