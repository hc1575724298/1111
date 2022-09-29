import request from '@/utils/request'

export function login(user) {
  return request({
    url: '/user/login',
    method: 'post',
    data: user
  })
}


export function getRememberedUsers() {

  return request({
    url: '/user/get-remembered-users',
    method: 'get',
    query: {}
  })
}

export function getUsersAll() {
  return request({
    url: '/user/all',
    method: 'get',
    query: {}
  })
}

export function changePassword(params) {
  return request({
    url: '/user/change-password',
    method: 'post',
    data: params
  })
}


export function deleteSelectedUser(user_id) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: user_id
  })
}

export function editName(params) {
  return request({
    url: '/user/modified-username',
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    data: params
  })
}
