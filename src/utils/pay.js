import { getAliPay } from '@/api/pay'
import { isMobileTerminal } from '@/utils/flexible'
export const alipay = async (title, desc) => {
  const { encodeURI } = await getAliPay(title, '0.01', desc, isMobileTerminal.value)
  window.location.href = decodeURIComponent(encodeURI)
}
