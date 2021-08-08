import { createStore } from 'vuex'

const store = createStore({
  state: {
    token: sessionStorage.getItem("token") || "",
    userId: sessionStorage.getItem("userId") || "",
    isAdmin: sessionStorage.getItem("isAdmin") || ""
  },
  getters: {
    isLoggedIn: (state) =>  {
      return !!state.token;
    },
    currentUserId: (state) => {
      return parseInt(state.userId)
    }
  },
  mutations: {
    auth_success (state, token, userId, isAdmin) {
      state.token = token;
      state.userId = userId;
      state.isAdmin = isAdmin;
    },
    auth_error (state) {
      state.token = "";
      state.userId = "";
      state.isAdmin = "";
    },
    logout (state) {
      state.token = "";
      state.userId = "";
      state.isAdmin = "";
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
            return res.json();
          }
        })
        .then(res => {
          const token = res.token;
          const userId = res.userId;
          const isAdmin = res.isAdmin;

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("isAdmin", isAdmin);

          return {token, userId, isAdmin}

        })
        .then((res) => {
          commit('auth_success', res.token, res.userId, res.isAdmin);
          resolve(res);
        })
        .catch(error => {
          commit('auth_error');
          reject(error);
        });      
      });
    }
  },
  modules: {
  }
})

 export default store;