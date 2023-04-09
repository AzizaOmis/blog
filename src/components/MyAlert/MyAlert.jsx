import React from 'react'
import { Alert, Space } from 'antd'

import { alertConstants } from '../../services/constants'

import classes from './MyAlert.module.scss'
const MyAlert = ({ message }) => {
  return (
    <div className={classes.Alert}>
      <Space>
        <Alert message="Error" description={message || alertConstants.default} type="error" showIcon />
      </Space>
    </div>
  )
}
export default MyAlert
