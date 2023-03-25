import request from '@/utils/request'
export const getVIPPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
