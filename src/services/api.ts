import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://200.129.17.134:3456',
  withCredentials: true,
})
