import axios from 'axios'

// http://200.129.17.134:3456

export const api = axios.create({
  baseURL: 'http://clearfaceapideploy.onrender.com',
  withCredentials: true,
})
