<template>
  <div @click="onWeiXinLogin">
    <SvgIcon class="w-4 cursor-pointer" name="wexin"></SvgIcon>
    <div id="login_container"></div>
  </div>
</template>

<script setup>
import { getWXLoginData, getWXLoginToken, getWXLoginUserInfo } from '@/api/sys'
import broadcast from './broadcast'
import { authorLogin } from './author'
import { LOGIN_TYPE_WX } from '@/constants/index'
if (window.location.search) {
  const code = /code=((.*))&state/.exec(window.location.search)[1]
  if (code) {
    broadcast.send({ code })
  } else {
    window.close()
  }
}
const onWeiXinLogin = async () => {
  const { appId, appSecret, redirectUri, scope, state } = await getWXLoginData()
  window.open(`https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`, 
    '', 'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
  broadcast.wait().then(async({ code }) => {
    broadcast.clear()
    const { access_token, openid } = await getWXLoginToken(appId, appSecret, code)
    const { nickname, headimgurl } = await getWXLoginUserInfo(access_token, openid)
    authorLogin(LOGIN_TYPE_WX, {
      openid,
      nickname,
      headimgurl
    })
  })
}
</script>

<style lang="scss" scoped>

</style>