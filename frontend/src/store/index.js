import { createStore } from 'vuex';
import axios from 'axios';

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
      return parseInt(state.userId);
    },
    isUserAdmin: (state) => {
      if (state.isAdmin === "true") {
        return true;
      } else {
        return false;
      }
    }
  },
  mutations: {
    auth_success (state) {
      state.token = sessionStorage.getItem("token");
      state.userId = sessionStorage.getItem("userId");
      state.isAdmin = sessionStorage.getItem("isAdmin");
    },
    auth_error (state) {
      sessionStorage.clear();
      state.token = "";
      state.userId = "";
      state.isAdmin = "";
    },
    logout (state) {
      sessionStorage.clear();
      state.token = "";
      state.userId = "";
      state.isAdmin = "";
    }
  },
  actions: {
    signIn ({commit}, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/user/login",
          method: 'POST',
          data: user
        })
        .then(res => {
          const token = res.data.token;
          const userId = res.data.userId;
          const isAdmin = res.data.isAdmin;

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
      })
    }
  },
  modules: {
  }
})

 export default store;