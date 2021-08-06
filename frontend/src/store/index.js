import { createStore } from 'vuex'

const store = createStore({
  state: {
    token: sessionStorage.getItem("token") || "",
    user: sessionStorage.getItem("user") || {}
  },
  getters: {
    isLoggedIn: (state) =>  {
      return !!state.token
    }
  },
  mutations: {
    auth_success (state, token, user) {
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.token = ""
      state.user = {}
    },
    logout (state) {
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
          };

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", user);

          commit('auth_success', token, user);
          resolve(res)
        })
        .catch(error => {
          commit('auth_error');
          reject(error);
        })        
      })
    }
  },
  modules: {
  }
})

 export default store;