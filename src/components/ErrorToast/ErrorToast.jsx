import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { toastConstants } from '../../services/constants'

import 'react-toastify/dist/ReactToastify.css'

const ErrorToast = ({ message }) => {
  if (JSON.parse(message)) {
    let res = JSON.parse(message)
    for (let key in res) {
      toast.error(key + ' ' + res[key], toastConstants.params)
    }
  } else {
    toast.error(toastConstants.defaultErrMessage, toastConstants.params)
  }
  return <ToastContainer />
}
export default ErrorToast
