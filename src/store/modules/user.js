import { getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import UserAPI from '@/api/auth/user'
import config from '@/utils/config'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    userInfo: {}
  }
}

// const state = {
//   token: getToken(),
//   name: '',
//   avatar: '',
//   userInfo: {}
//   // introduction: '',
//   // roles: []
// }
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
    localStorage.setItem(
      config.userKey,
      JSON.stringify({
        id: data.id,
        username: data.username
        // name: data.name,
        // avatar: data.avatar,
        // merchantId: data.merchantId,
        // isAdministrator: data.isAdministrator
      })
    )
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      UserAPI.login({ username: username.trim(), password: password })
        .then((response) => {
          commit('SET_TOKEN', response.accessToken)
          commit('SET_USER_INFO', response)
          setToken(response.accessToken)
          // const { data } = response
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { username } = data

          // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }

          // commit('SET_ROLES', roles)
          commit('SET_NAME', username)
          // commit('SET_AVATAR', avatar)
          // commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      UserAPI.logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          localStorage.removeItem(config.userKey)
          // commit("SET_TOKEN", "");
          // commit("SET_ROLES", []);
          // removeToken();
          // resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch("tagsView/delAllViews", null, { root: true });

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
      // commit("SET_TOKEN", "");
      // commit("SET_ROLES", []);
      // removeToken();
      // resolve();
    })
  }

  // dynamically modify permissions
  //   async changeRoles({ commit, dispatch }, role) {
  //     const token = role + "-token";

  //     commit("SET_TOKEN", token);
  //     setToken(token);

  //     const { roles } = await dispatch("getInfo");

  //     resetRouter();

  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch("permission/generateRoutes", roles, {
  //       root: true,
  //     });
  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes);

//     // reset visited views and cached views
//     dispatch("tagsView/delAllViews", null, { root: true });
//   },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
