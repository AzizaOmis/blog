import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Pagination } from 'antd'

import { fetchArticles, onPaginationClick } from '../../store/articlesSlice'

import './MyPagination.scss'

const MyPagination = () => {
  let { articlesCount, currentPage } = useSelector((state) => state.articles)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.sign.user.token)
  let history = useHistory()
  let location = useLocation()
  const onChange = (page) => {
    dispatch(onPaginationClick(page))
    const data = {
      offset: (page - 1) * 5,
      token: token || localStorage.token
    }
    dispatch(fetchArticles(data))
    history.push({
      search: `page=${page}`
    })
  }
  useEffect(() => {
    if (location.search.includes('?page=')) {
      const page = Number(location.search.slice(6))
      onChange(page)
    } else {
      onChange(1)
    }
  }, [])
  return (
    <Pagination
      current={currentPage}
      defaultPageSize="5"
      total={articlesCount}
      onChange={onChange}
      showSizeChanger={false}
    />
  )
}
export default MyPagination
