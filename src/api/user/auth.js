import baseurl from '../baseurl'

export const loginUserAPI = async (data) => {
  try {
    const response = await baseurl.post('/login', data)
    console.log('✅ Login API response:', response.data)
    return response
  } catch (error) {
    console.error('❌ Login API error:', error.response?.data || error.message)
    throw error
  }
}
export const logoutUserAPI = () => baseurl.get('/logout')
export const getProfileAPI = () => baseurl.get('/me')
export const updateProfileAPI = (data) => baseurl.put('/update', data)

export const getAllUsersAPI = (params) => baseurl.get('/user', { params })
