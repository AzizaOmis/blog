import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ArticlePreview from '../ArticlePreview'
import MyAlert from '../MyAlert/MyAlert'
import MySpin from '../MySpin'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  const { articles, loading, error } = useSelector((state) => state.articles)
  if (loading) return <MySpin />
  if (error) return <MyAlert />
  const list = articles.map((item) => {
    return (
      <Link to={`/articles/${item.slug}`} key={item.slug}>
        <li key={item.slug} className={classes.Article}>
          <ArticlePreview data={item} />
        </li>
      </Link>
    )
  })
  return <ul className={classes.ArticleList}>{list}</ul>
}
export default ArticleList
