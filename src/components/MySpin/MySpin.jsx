import React from 'react'
import { Space, Spin } from 'antd'

import classes from './MySpin.module.scss'
const MySpin = () => {
  return (
    <div className={classes.Spin}>
      <Space>
        <Spin size="large" />
      </Space>
    </div>
  )
}
export default MySpin
