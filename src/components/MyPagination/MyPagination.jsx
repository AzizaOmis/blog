import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Pagination } from 'antd'

import { fetchArticles, onPaginationClick } from '../../redux/articlesSlice'

import './MyPagination.scss'

const MyPagination = () => {
  let { articlesCount, currentPage } = useSelector((state) => state.articles)
  const dispatch = useDispatch()
  let history = useHistory()
  let location = useLocation()
  const onChange = (page) => {
    dispatch(onPaginationClick(page))
    dispatch(fetchArticles((page - 1) * 5))
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
