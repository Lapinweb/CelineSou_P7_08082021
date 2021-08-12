import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        token: localStorage.getItem("token") || "",
        userId: localStorage.getItem("userId") || "",
        isAdmin: localStorage.getItem("isAdmin") || ""
    },
    getters: {
        isLoggedIn: (state) =>  {   //vérifie si l'utilisateur est connecté grâce à la présence du token
            return !!state.token;
        },
        currentUserId: (state) => {     //renvoie l'ID de l'utilisateur
            return parseInt(state.userId);
        },
        isUserAdmin: (state) => {   //vérifie si l'utilisateur est administrateur
            if (state.isAdmin === "true") {  //si les valeurs sont des strings (localStorage), elles sont reconverties en booleans
                return true;
            }
            if (state.isAdmin === "false") {
                return false;
            }
            return state.isAdmin;
        }
    },
    mutations: {
        auth_success (state, {token, userId, isAdmin}) {
            state.token = token;
            state.userId = userId;
            state.isAdmin = isAdmin;
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

                    commit('auth_success',{token, userId, isAdmin});
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