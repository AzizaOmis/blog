import React from 'react'
import { Alert, Space } from 'antd'

import classes from './MyAlert.module.scss'
export default function MyAlert() {
  return (
    <div className={classes.Alert}>
      <Space>
        <Alert
          message="Error"
          description="An error occurred. Please check your network connection."
          type="error"
          showIcon
        />
      </Space>
    </div>
  )
}
