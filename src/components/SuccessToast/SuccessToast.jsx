import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { toastConstants } from '../../services/constants'

import 'react-toastify/dist/ReactToastify.css'

const SuccessToast = ({ message }) => {
  toast.success(message, toastConstants.params)
  return <ToastContainer />
}
export default SuccessToast
