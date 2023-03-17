import { watch } from 'vue'
import store from '@/store/index'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants/index'
let matchMedia = null
const watchSystemThemeChange = () => {
  if (matchMedia) {
    return
  }
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
const changeTheme = (theme) => {
  let themeClassName = ''
    switch(theme) {
      case THEME_LIGHT:
        themeClassName = 'light'
        break
      case THEME_DARK:
        themeClassName = 'dark'
        break
      case THEME_SYSTEM:
        watchSystemThemeChange()
        themeClassName = matchMedia.matches ? 'dark' : 'light'
        break
    }
    document.querySelector('html').className = themeClassName
}
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}