import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Article from '../Article/Article'
import MyAlert from '../MyAlert/MyAlert'
import MySpin from '../MySpin'

import classes from './ArticleList.module.scss'

export default function ArticleList() {
  const { articles, loading, error } = useSelector((state) => state.articles)
  if (loading) return <MySpin />
  if (error) return <MyAlert />
  const list = articles.map((item) => {
    return (
      <Link to={`/articles/${item.slug}`} key={item.slug}>
        <li key={item.slug} className={classes.Article}>
          <Article
            preview={true}
            title={item.title}
            description={item.description}
            body={item.body}
            tagList={item.tagList}
            createdAt={item.createdAt}
            favorited={item.favorited}
            favoritesCount={item.favoritesCount}
            author={item.author}
          />
        </li>
      </Link>
    )
  })
  return <ul className={classes.ArticleList}>{list}</ul>
}
