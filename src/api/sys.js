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
export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}
export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}
export const getWXLoginData = () => {
  return request({
    url: '/sys/wxlogin/data'
  })
}
export const getWXLoginToken = (appid, secret, code) => {
  return request({
    url: '/sys/wxlogin/access_token',
    params: {
      appid,
      secret,
      code
    }
  })
}
export const getWXLoginUserInfo = (accessToken, openid) => {
  return request({
    url: '/sys/wxlogin/userinfo',
    params: {
      accessToken,
      openid
    }
  })
}
