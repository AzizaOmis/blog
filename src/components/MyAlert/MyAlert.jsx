import React from 'react'
import { Alert, Space } from 'antd'

import classes from './MyAlert.module.scss'
const MyAlert = ({ message }) => {
  return (
    <div className={classes.Alert}>
      <Space>
        <Alert
          message="Error"
          description={message || 'An error occurred. Please check your network connection or try again later.'}
          type="error"
          showIcon
        />
      </Space>
    </div>
  )
}
export default MyAlert
