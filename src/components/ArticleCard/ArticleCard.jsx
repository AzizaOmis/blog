import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticleBySlug } from '../../redux/articleSlice'
import Article from '../Article/Article'
import MyAlert from '../MyAlert/MyAlert'
import MySpin from '../MySpin'

const ArticleCard = ({ slug }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [slug])
  const data = useSelector((state) => state.article)
  if (data.loading) return <MySpin />
  if (data.error) return <MyAlert />
  const { title, description, body, tagList, createdAt, favorited, favoritesCount, author } = data.articleData
  return (
    <Article
      preview={false}
      title={title}
      description={description}
      body={body}
      tagList={tagList}
      createdAt={createdAt}
      favorited={favorited}
      favoritesCount={favoritesCount}
      author={author}
    />
  )
}
export default ArticleCard
