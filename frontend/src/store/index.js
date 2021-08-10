import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        token: localStorage.getItem("token") || "",
        userId: localStorage.getItem("userId") || "",
        isAdmin: localStorage.getItem("isAdmin") || ""
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
            state.token = localStorage.getItem("token");
            state.userId = localStorage.getItem("userId");
            state.isAdmin = localStorage.getItem("isAdmin");
        },
        auth_error (state) {
            localStorage.clear();
            state.token = "";
            state.userId = "";
            state.isAdmin = "";
        },
        auth_logout (state) {
            localStorage.clear();
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

                    localStorage.setItem("token", token);
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("isAdmin", isAdmin);

                    commit('auth_success');
                    resolve(res);
                })
                    .catch(error => {
                    commit('auth_error');
                    reject(error);
                });
            })
        },
        logOut({ commit }) {
            commit('auth_logout');
        }
    },
    modules: {
    }
})

export default store;