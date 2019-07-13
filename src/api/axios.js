// 配置axios
import axios from 'axios'

const instance = axios.create({
  // 配置对象 基准路径 头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
//   headers: {
//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
//   }
})

// 请求拦截
instance.interceptors.request.use(config => {
  // 给头部加认证信息
  const user = window.sessionStorage.getItem('hm74-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // Promise.reject(error):是返回一个一定错误的promise对象
  // promise.resovle():返回一个一定成功的promise对象
  // new promise():可能是成功的可能是失败的
  return Promise.reject(error)
})
export default instance
