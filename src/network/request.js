import axios from 'axios'

axios.defaults.withCredentials=true //跨域
// 1.创建axios实例
const instance = axios.create({
  baseURL: 'http://xxx.xxxxx.xx', // 后台地址
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' 
  },
})

export { instance } 



