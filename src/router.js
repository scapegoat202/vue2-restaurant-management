import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CategoryList from './views/category/CategoryList'
import CommodityList from './views/commodity/CommodityList'
import AddCommodity from './views/commodity/AddCommodity'
import StoreInfo from './views/store/StoreInfo'
import PendingOrders from './views/order/PendingOrders'
import OrderList from './views/order/OrderList'
import CustomerList from './views/customer/CustomerList'
import UnderConstruction from './views/UnderConstruction'
import Register from './views/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Register
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: UnderConstruction
        },
        {
          path: '/stores/info',
          name: 'storeInfo',
          component: StoreInfo,
          meta: ['店铺管理', '店铺信息']
        },
        {
          path: '/categories/all',
          name: 'categoryList',
          component: CategoryList,
          meta: ['类目管理', '类别列表']
        },
        {
          path: '/commodities/all',
          name: 'commodityList',
          component: CommodityList,
          meta: ['商品管理', '商品列表']
        },
        {
          path: '/commodities/add',
          name: 'addCommodity',
          component: AddCommodity,
          meta: ['商品管理', '添加商品']
        },
        {
          path: '/orders/pending',
          name: 'pendingOrders',
          component: PendingOrders,
          meta: ['订单管理', '待处理订单']
        },
        {
          path: '/orders/all',
          name: 'orderList',
          component: OrderList,
          meta: ['订单管理', '订单列表']
        },
        {
          path: '/customers/all',
          name: 'customer',
          component: CustomerList,
          meta: ['用户管理', '用户列表']
        }
      ]
    }
  ]
})
