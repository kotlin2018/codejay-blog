// import router from './index';

// import { getToken } from '../utils/getToken'

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