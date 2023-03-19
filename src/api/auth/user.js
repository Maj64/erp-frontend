import request from '@/utils/request'
import config from '@/utils/config'

const UserAPI = {
  create(data) {
    return request({
      url: `${config.api.base}/register`,
      method: 'post',
      data
    })
  },
  getById(id) {
    return request({
      url: `${config.api.base}/${id}`,
      method: 'get'
    })
  },
  update(id, data) {
    return request({
      url: `${config.api.base}/${id}`,
      method: 'put',
      data
    })
  },
  login(data) {
    return request({
      url: `${config.api.base}/login`,
      method: 'post',
      data
    })
  },
  changePassword(data) {
    return request({
      url: `${config.api.base}/changePassword`,
      method: 'put',
      data
    })
  },
  refreshToken() {
    return request({
      url: `${config.api.base}/refreshToken`,
      method: 'get'
    })
  }
}

export default UserAPI
