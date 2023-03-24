import OSS from 'ali-oss'
import { getSts } from '@/api/sys'
import { REGION, BUCKET } from '@/constants/index'
export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    region: REGION,
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    stsToken: res.Credentials.SecurityToken,
    bucket: BUCKET,
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    refreshSTSTokenInterval: 5 * 1000
  })
}