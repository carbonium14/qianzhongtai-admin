import request from '@/utils/request'
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
export const registerUser = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}
