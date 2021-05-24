import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp2'
import UserDetail from '@/components/UserDetail2'
import BrowseGoods from '@/components/BrowseGoods'
import GoodsDetail from '@/components/GoodsDetail'
import OrderDetail from '@/components/OrderDetail'
import OrderList from '@/components/OrderList'
import UploadGood from '@/components/UploadGood'
import ShoppingTrolley from '@/components/ShoppingTrolley'

Vue.use(Router)
export default new Router({
    mode: 'history',

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
        },
        {
            path: '/ShoppingTrolley',
            name: 'ShoppingTrolley',
            component: ShoppingTrolley
        },
    ]
})
