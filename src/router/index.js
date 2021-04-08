import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import UserPage from '@/components/UserPage'
import BrowseGoods from '@/components/BrowseGoods'
import GoodsDetail from '@/components/GoodsDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
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
      path: '/UserPage',
      name: 'UserPage',
      component: UserPage
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
  ]
})
