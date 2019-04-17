import axios from 'axios'
import { Notification } from 'element-ui'
import NProgress from 'nprogress';


import util from '@/libs/util'
import qs from 'qs';


// 创建一个 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    NProgress.start();
    // 在请求发送之前做一些处理
    const token = sessionStorage.getItem('token');
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = token;
    return config;
  },
  error => {
    // 发送失败
    NProgress.done();
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    NProgress.done();
    const dataAxios = response.data
    return dataAxios;
  },
  error => {
    NProgress.done();
    if(error.response.data.code === 5){
      Notification.error({
        title: '错误',
        message: '认证过期，请重新登录'
      });
      setTimeout(function() {
        sessionStorage.clear();
        location.href='/';
      }, 1000);
    }else{
      let msg = typeof error.response.data=='object'?error.response.data.message:'网络错误';
      //请求错误时做些事
      Notification.error({
        title: '错误',
        message: msg
      });
    }
    return Promise.reject(error)
  }
)

export default service
