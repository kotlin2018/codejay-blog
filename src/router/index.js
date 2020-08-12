import Vue from 'vue';
import VueRouter from 'vue-router';
import {adminIsLogined} from '../network/adminOperation'

import {
  getToken
} from '../utils/getToken'

const Home = () => import('../views/home/Home');
const Article = () => import('../views/article/Article');
const Demo = () => import('../views/demo/Demo');
const Tool = () => import('../views/tool/Tool');
const About = () => import('../views/about/About');
const Login = () => import('../views/login/Login');
const Essay = () => import('../views/essay/Essay');
const Detail = () => import('../views/detail/Detail');
// // 插件安装
Vue.use(VueRouter);


const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    // path: '/category/:name',
    path: '/article',
    component: Article
  },
  {
    path: '/demo',
    component: Demo
  },
  {
    path: '/tool',
    component: Tool
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/essay',
    component: Essay
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/admin/admin.vue'),
    children: [
      {
        path: '/admin/article/publish',
        name: 'articlePublish',
        component: () => import('../components/admin/childComps/articlePublish.vue')
      }, 
      {
        path: '/admin/article/category',
        name: 'articleCategory',
        component: () => import('../components/admin/childComps/articleCategory.vue')
      },
      {
        path: '/admin/article/label',
        name: 'articleLabel',
        component: () => import('../components/admin/childComps/articleLabel.vue')
      },
      {
        path: '/admin/article/management',
        name: 'articleManagement',
        component: () => import('../components/admin/childComps/articleManagement.vue')
      },
      {
        path: '/admin/article/message',
        name: 'articleMessage',
        component: () => import('../components/admin/childComps/articleMessage.vue')
      },
    ]
  },
]
// 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history',
})



// const whiteRouter = ['/login'];  // indexOf 方法

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     console.log('存在')
//   }else {
//     console.log('不存在')
//     if(whiteRouter.indexOf(to.path) !== -1) {
//       next()
//     }else {
//       next('/login')
//     }
//   }
// })

/* 全局导航守卫 */
// router.beforeEach((to,from,next) => {
//   if(to.path=="/login") {
//       if(localStorage.getItem('username')) {
//         router.replace({name:'logined'})
//       }
//   }
//   next()
// })
/* 管理系统守卫 */
router.beforeEach((to,from,next) => {
  if(to.path.includes("/admin")) {
    adminIsLogined().then(res => {
      if(res.data.err === 0) {
        next()
      } else {
        // alert(res.data.message);
        next('/login')
      }
    })
  }
  next()
})



// 以登陆状态
// router.beforeEach((to, from, next) => {
//   if(to.path.includes("/login")) {
//     adminIsLogined().then(res => {
//       if(res.data.err != 0) {
//         router.push({ name:'admin/article'})
//       } else {
//         router.push({ name: 'login'})
//       }
//     })
//   }
//   next()
// })

// 导出
export default router;
