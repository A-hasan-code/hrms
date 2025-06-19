import axios from 'axios'

const baseurl = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Your backend base URL
  withCredentials: true, // for sending cookies
})

export default baseurl
