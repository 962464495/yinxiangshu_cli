import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    user: '',
    token: getToken()
  },
  mutations: {
    SetUser (state, user) {
      state.user = user
    },
    SetToken (state, token) {
      state.token = token
      setToken(token)
    }

  },
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SetToken', 'test')
        commit('SetUser', 'test')
        resolve('test')
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('SetToken', '')
        commit('SetUser', '')
        resolve()
      })
    }

  }
}
