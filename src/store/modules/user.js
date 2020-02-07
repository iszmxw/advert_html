import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  user_id: getUserId(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        var searchURL = window.location.search
        searchURL = searchURL.substring(1, searchURL.length)
        var user_id = searchURL.split('&')[0].split('=')[1]
        if (user_id !== undefined) {
          commit('SET_USER_ID', user_id)
          setUserId(user_id)
        } else {
          removeUserId()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    var searchURL = window.location.search
    searchURL = searchURL.substring(1, searchURL.length)
    var user_id = searchURL.split('&')[0].split('=')[1]
    if (user_id !== undefined) {
      commit('SET_USER_ID', user_id)
      setUserId(user_id)
    } else {
      removeUserId()
    }
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const { info, roles, name, avatar, introduction } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_ID', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUserId()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_ID', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserId()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)
      var searchURL = window.location.search
      searchURL = searchURL.substring(1, searchURL.length)
      var user_id = searchURL.split('&')[0].split('=')[1]
      if (user_id !== undefined) {
        commit('SET_USER_ID', user_id)
        setUserId(user_id)
      } else {
        removeUserId()
      }

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

