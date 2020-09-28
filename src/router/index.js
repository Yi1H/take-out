import Vue from 'vue'
import VueRouter from 'vue-router'

//路由得懒加载条目
const home = () => import('../views/home/home')
const city = () => import('../views/city/city')
const login = () => import('../views/login/login')
const msite = () => import('../views/msite/msite')
const profile = () => import('../views/profile/profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    //重定向
    redirect: '/home'
  },
  //首页城市列表
  {
    path: '/home',
    component: home
  },
  //当前城市界面
  {
    path: '/city/:cityId',
    component: city
  },
  //所有商铺列表页
  {
    path: '/msite',
    component: msite
  },
  //登录注册界面
  {
    path: '/login',
    component: login
  },
  //个人信息界面
  {
    path: '/profile',
    component: profile
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history',
})

export default router
