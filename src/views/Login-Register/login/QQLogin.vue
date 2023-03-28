<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <SvgIcon class="w-4 cursor-pointer" name="qq" @click="onQQLogin"></SvgIcon>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import broadcast from './broadcast'
import { authorLogin } from './author'
import { LOGIN_TYPE_QQ } from '@/constants/index'
const QQ_LOGIN_URL = 'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
onMounted(() => {
  QC.Login({
    btnId: 'qqLoginBtn' 
  }, ({ nickname, figureurl_qq_2 }, opts) => {
    QC.Login.signOut()
    const accessToken = /access_token=((.*))&expires_in/.exec(window.location.hash)[1]
    const authorObj = {
      nickname,
      figureurl_qq_2,
      accessToken
    }
    broadcast.send(authorObj)
    authorLogin({ LOGIN_TYPE_QQ , authorObj})
    window.close()
  }
)})
const onQQLogin = () => {
  openQQWindow()
}
const openQQWindow = async () => {
  window.open( QQ_LOGIN_URL, 'oauth2Login_10609', 'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
  broadcast.wait().then((authorObj) => {
    broadcast.clear()
    authorLogin({ LOGIN_TYPE_QQ , authorObj})
  })
}
</script>
