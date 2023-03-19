import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, removeToken, setToken } from '@/utils/auth'
import config from '@/utils/config'
import UserAPI from '@/api/auth/user'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 /* 5000  */ // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['authorization'] = 'Bearer ' + getToken()
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    let msg = ''
    if (response.status !== config.httpCode.SUCCESS && response.status !== config.httpCode.CREATED) {
      Message.closeAll()

      Message({
        message: `Mã lỗi ${response.status}. ${response.msg}` || `Mã lỗi ${response.status}. ${response.data.msg}` || `Mã lỗi ${response.status}. ${response.data.message}` || `Mã lỗi ${response.status}. Có lỗi xảy ra`,
        type: 'error',
        duration: 10 * 1000
      })
    } else {
      switch (response.config.method) {
        case 'post':
          msg = 'Thêm mới thành công'
          break
        case 'put':
          msg = 'Cập nhật thành công'
          break
        case 'delete':
          msg = 'Xóa thành công'
          break
        default:
          msg = 'Thao tác thành công'
          break
      }

      const url = response.request.responseURL
      const urlSplit = url.split('/')
      const endPoint = urlSplit[urlSplit.length - 1]
      const isLogin = endPoint === 'login'

      if (response.config.method !== 'get' && !isLogin) {
        Message.closeAll()
        Message({
          message: msg || response.msg || response.data.msg || response.data.message,
          type: 'success',
          duration: 3 * 1000
        })
      }

      return response.data
    }
    // const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    if (error.response && error.response.status === config.httpCode.TOKEN_EXPIRED) {
      UserAPI.refreshToken().then(res => {
        if (res && res.token) {
          removeToken()
          setToken(res.token)
          window.location.reload()
        } else {
          MessageBox.confirm('Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại để tiếp tục truy cập!', 'Xác nhận đăng xuất', {
            confirmButtonText: 'Đăng nhập lại',
            cancelButtonText: 'Hủy',
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            removeToken()
            window.location.href = '/login'
          })

          setTimeout(() => {
            removeToken()
            window.location.href = '/login'
          }, 2000)
        }
      }).catch(err => {
        console.log(err)
        MessageBox.confirm('Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại để tiếp tục truy cập!', 'Xác nhận đăng xuất', {
          confirmButtonText: 'Đăng nhập lại',
          cancelButtonText: 'Hủy',
          showConfirmButton: false,
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          removeToken()
          window.location.href = '/login'
        })

        setTimeout(() => {
          removeToken()
          window.location.href = '/login'
        }, 2000)
      })
    } else {
      Message.closeAll()
      const msg = (error && error.response && error.response.status) ? `Mã lỗi ${error.response.status}: Có lỗi xảy ra` : `Có lỗi xảy ra`
      Message({
        message: (error.response && error.response.data.msg) || msg,
        type: 'error',
        duration: 3 * 1000
      })
    }

    return Promise.reject(error)
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // return Promise.reject(error)
  }
)

export default service
