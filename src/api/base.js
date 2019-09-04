import axios from '@/libs/api.request'

export function get (url, data = {}) {
  return axios.request({
    url: url,
    params: data,
    method: 'get'
  })
}

export function post (url, data = {}) {
  return axios.request({
    url: url,
    data: data,
    method: 'post'
  })
}
