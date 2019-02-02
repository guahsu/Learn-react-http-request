import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  params: {}
})

const myRequestInterceptors = axios.interceptors.request.use(request => {
  console.log('interceptors-request:', request)
  return request
}, error => {
  console.log('interceptors-request-error:', error)
  return Promise.reject(error)
})

const myResponseInterceptors = axios.interceptors.response.use(response => {
  console.log('interceptors-response:', response)
  return response
}, error => {
  console.log('interceptors-response-error:', error)
  return Promise.reject(error)
})

instance.interceptors.request.eject(myRequestInterceptors)
instance.interceptors.response.eject(myResponseInterceptors)

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
