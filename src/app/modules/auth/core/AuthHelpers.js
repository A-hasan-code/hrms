import Cookies from 'js-cookie'

const AUTH_COOKIE_KEY = 'token'
console.log('AUTH_COOKIE_KEY:', AUTH_COOKIE_KEY)
 // Ensure cookie is accessible
// ✅ Get JWT token from cookie (no parsing)
const getAuth = () => {
  try {
    const token = Cookies.get(AUTH_COOKIE_KEY)
    console.log('🍪 getAuth token:', token)
    return token || undefined
  } catch (error) {
    console.error('AUTH COOKIE GET ERROR', error)
    return undefined
  }
}

// ❌ Optional: Only if logout required
const removeAuth = () => {
  try {
    Cookies.remove(AUTH_COOKIE_KEY)
  } catch (error) {
    console.error('AUTH COOKIE REMOVE ERROR', error)
  }
}

// ✅ Axios Setup: automatically attach token
const setupAxios = (axios) => {
  axios.defaults.headers.Accept = 'application/json'
  axios.defaults.withCredentials = true // ⭐ very important to receive/send cookies

  axios.interceptors.request.use(
    (config) => {
      const token = getAuth()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}

export { getAuth, removeAuth, setupAxios }
