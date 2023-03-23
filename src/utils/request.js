import axios from 'axios'
import store from '@/store/index'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
service.interceptors.request.use((config) => {
  config.headers.icode = '7DA119F449D8919F'
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(new Error(error))
})
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
}, (error) => {
  if (error.response?.data?.code === 401) {
    store.dispatch('user/logout')
  }
  return Promise.reject(new Error(error))
})
export default service