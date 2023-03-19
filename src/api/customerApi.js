import request from '@/utils/request'
import config from '@/utils/config'
// import * as queryString from 'querystring'

const CustomerAPI = {
  create(data) {
    return request({
      url: `${config.api.customer}`,
      method: 'post',
      data
    })
  },
  get(id) {
    return request({
      url: `${config.api.customer}/${id}`,
      method: 'get'
    })
  },
  getAll() {
    return request({
      url: `${config.api.base}/customers`,
      method: 'get'
    })
  },
  update(id, data) {
    return request({
      url: `${config.api.customer}/${id}`,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url: `${config.api.customer}/${id}`,
      method: 'delete'
    })
  }
}
export default CustomerAPI
