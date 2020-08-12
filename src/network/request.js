import axios from 'axios'

axios.defaults.withCredentials=true
// 1.创建axios实例
const instance = axios.create({
  baseURL: 'http://XXX.XXX.X.XXX:XXXX', // 后台地址
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' 
  },
  // withCredentials:true
})

export { instance } 



