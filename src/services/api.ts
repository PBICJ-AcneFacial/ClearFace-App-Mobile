import axios from 'axios'

export const api = axios.create({
  baseURL: 'http:api_adress',
  withCredentials: true,
})
