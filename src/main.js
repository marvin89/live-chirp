import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app'
import Home from './pages/home'
import Login from './pages/login'

Vue.use(VueRouter)

const Router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            title: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            title: 'Login',
            component: Login
        }
    ]
})

// console.log(Router.options.routes)

new Vue({
    el: '#app',
    template: '<App/>',
    router: Router,
    components: { App }
})
