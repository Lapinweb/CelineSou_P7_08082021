import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/posts',
        component: Home,
        children: [{
            path: '/login',
            name: 'Login',
            components: {HomeView: Login}
        },
        {
            path: '/signup',
            name: 'Signup',
            components: {HomeView: Signup}
        }]         
    },
    {
        path: '/posts',
        name: 'AllPosts',
        component: () => import('../views/AllPosts.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/post/:id',
        name: 'SinglePost',
        component: () => import('../views/SinglePost.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/newpost',
        name: 'PostCreate',
        component: () => import('../views/PostCreate.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/post/:id/modify',
        name: 'PostModify',
        component: () => import('../views/PostModify.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {requireAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if(!store.getters.isLoggedIn) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
