import cookie from 'cookie_js'
export function getToken() {
  return cookie.get('admin_token')
}

export function setToken(token) {
  cookie.set('admin_token',token)
}