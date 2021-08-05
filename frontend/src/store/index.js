import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuth: false,
    token: "",
    user: {}
  },
  getters: {
    isLoggedIn: (state) =>  {
      return state.isAuth
    }
  },
  mutations: {
    auth_success (state, token, user) {
      state.isAuth = true
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.isAuth = false
      state.token = ""
      state.user = {}
    },
    logout (state) {
      state.isAuth = false
      state.token = ""
      state.user = {}
    }
  },
  actions: {
    signIn ({ commit }, user) {
      return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(res => {
          const token = res.token;
          const user = {
            id: res.userId,
            isAdmin: res.isAdmin
          }
          commit('auth_success', token, user);
          resolve(res)
        })
        .catch(error => {
          reject(error);
        })        
      })

    }
  },
  modules: {
  }
})

 export default store;