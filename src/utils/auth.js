// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

import config from '@/utils/config'

const TOKEN_KEY = config.tokenKey
const PERMISSION_KEY = config.permissionKey

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export function setPermission(data) {
  return localStorage.setItem(PERMISSION_KEY, data)
}

export function getPermission() {
  return localStorage.getItem(PERMISSION_KEY)
}

export function removePermission() {
  return localStorage.removeItem(PERMISSION_KEY)
}
