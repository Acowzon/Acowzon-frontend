import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import UserDetail from '@/components/UserDetail'
import BrowseGoods from '@/components/BrowseGoods'
import GoodsDetail from '@/components/GoodsDetail'
import OrderDetail from '@/components/OrderDetail'
import OrderList from '@/components/OrderList'
import UploadGood from '@/components/UploadGood'

Vue.use(Router)

export default new Router({
    mode: 'history',
    /**beforeEach: ((to, from, next) => {
        if (!this.$cookies.isKey('UserName') || !this.$cookies.isKey('UserID')) {
            next({
                path: '/SignIn'
            })
        } else {
            next();
        }

    }),**/
    routes: [{
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
        {
            path: '/SignIn',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/UserDetail',
            name: 'UserDetail',
            component: UserDetail
        },
        {
            path: '/BrowseGoods',
            name: 'BrowseGoods',
            component: BrowseGoods
        },
        {
            path: '/GoodsDetail',
            name: 'GoodsDetail',
            component: GoodsDetail
        },
        {
            path: '/OrderList',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/OrderDetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: '/UploadGood',
            name: 'UploadGood',
            component: UploadGood
        }
    ]
})