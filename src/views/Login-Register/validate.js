export const validateUsername = (val) => {
  if (!val) {
    return '用户名是必填的'
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名应该在3-12个字符之间'
  }
  return true
}
export const validatePassword = (val) => {
  if (!val) {
    return '密码是必填的'
  }
  if (val.length < 6 || val.length > 12) {
    return '密码应该在6-12个字符之间'
  }
  return true
}
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
