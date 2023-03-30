import request from '@/utils/request'
export const getVIPPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
export const getAliPay = (subject, totalAmount, body, isMobile) => {
  return request({
    url: '/user/alipay',
    params: {
      subject,
      totalAmount,
      body,
      isMobile
    }
  })
}
export const getPayResult = (out_trade_no) => {
  return request({
    url: '/sys/pay/result',
    params: {
      out_trade_no
    }
  })
}
