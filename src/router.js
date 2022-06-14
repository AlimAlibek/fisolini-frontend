import Vue from 'vue';
import Router from 'vue-router';
//import store from './store/store.js';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/auth/login'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/',
            name: 'Main',
            component: () => import('./views/Main.vue'),
            meta: {
                requiresAuth: true
            }
        },
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters.isLoggedIn) {
//             next()
//             return
//         }
//         next('/login')
//     } else {
//         next()
//     }
// });

export default router
