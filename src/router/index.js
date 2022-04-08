import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/diag'
    },
    {
        path: '/diag',
        name: 'diag',
        meta: {label: '登录首页'},
        component: () => import('../view/Drag-home.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
