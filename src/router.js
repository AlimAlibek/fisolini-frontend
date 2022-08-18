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
        {
            path: '/product',
            name: 'Product',
            component: () => import('./views/Product.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
            meta: {
                requiresAuth: true
            }
        },{
            path: '/publicoffer',
            name: 'publicoffer',
            component: () => import('./views/PublicOffer.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/payment',
            name: 'payment',
            component: () => import('./views/Payment.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reviews',
            name: 'reviews',
            component: () => import('./views/Reviews.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: () => import('./views/Catalog.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: () => import('./views/Contacts.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/guarantee',
            name: 'guarantee',
            component: () => import('./views/Guarantee.vue'),
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
