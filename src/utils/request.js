import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    config.headers.icode = '7DA119F449D8919F'
    return config 
  }
)
export default service