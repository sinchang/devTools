import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const client = axios.create()

const Http = options => {
  NProgress.start()

  const onSuccess = response => {
    NProgress.done()
    return response.data
  }

  const onError = error => {
    NProgress.done()
    return Promise.reject(error.response || error.message)
  }

  return client(options)
    .then(onSuccess)
    .catch(onError)
}

export default Http