import React from 'react'
import { Space, Spin } from 'antd'

import classes from './MySpin.module.scss'
export default function MySpin() {
  return (
    <div className={classes.Spin}>
      <Space>
        <Spin size="large" />
      </Space>
    </div>
  )
}
