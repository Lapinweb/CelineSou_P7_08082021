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
    auth_success (state) {
      state.token = sessionStorage.getItem("token");
      state.userId = sessionStorage.getItem("userId");
      state.isAdmin = sessionStorage.getItem("isAdmin");
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

          commit('auth_success');
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