import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Popconfirm } from 'antd'
import format from 'date-fns/format'
import { v4 as uuidv4 } from 'uuid'

import Avatar from '../../icons/Avatar.svg'
import Favorited from '../../icons/Favorited.svg'
import Heart from '../../icons/Heart.svg'
import { linkConstants } from '../../services/constants'
import {
  clearArticlePayload,
  fetchArticleBySlug,
  fetchDeleteFavorite,
  fetchPostFavorite
} from '../../store/articleSlice'
import { clearMyArticlePayload, fetchDeleteMyArticle } from '../../store/myArticleSlice'
import MySpin from '../MySpin'

import classes from './Article.module.scss'
const Article = ({ slug }) => {
  const userInfo = useSelector((state) => state.sign.user)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const data = {
      slug,
      token: userInfo.token
    }
    dispatch(fetchArticleBySlug(data))
  }, [])
  const onEdit = (slug) => {
    dispatch(clearArticlePayload())
    dispatch(clearMyArticlePayload())
    history.push({ pathname: `/articles/${slug}/edit` })
  }
  const onDelete = (slug) => {
    dispatch(clearArticlePayload())
    dispatch(clearMyArticlePayload())
    const data = {
      slug,
      token: userInfo.token
    }
    dispatch(fetchDeleteMyArticle(data))
    setTimeout(() => history.push({ pathname: linkConstants.default }), 400)
  }
  const likeToggler = (e, favorited) => {
    e.stopPropagation()
    e.preventDefault()
    if (userInfo.token === '' && localStorage.token === '') {
      history.push({ pathname: linkConstants.signIn })
      return
    }
    const data = {
      slug,
      token: userInfo.token
    }
    if (favorited) dispatch(fetchDeleteFavorite(data))
    if (!favorited) dispatch(fetchPostFavorite(data))
    setTimeout(() => dispatch(fetchArticleBySlug(data)), 400)
  }
  const article = useSelector((state) => state.article)
  if (article.success) {
    let control = null
    if (article.articleData.author.username === userInfo.username) {
      control = (
        <div className={classes.Control}>
          <Popconfirm
            title="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(slug)}
            placement="right"
          >
            <Button type="link" className={classes.Delete}>
              Delete
            </Button>
          </Popconfirm>
          <button type="button" className={classes.Edit} onClick={() => onEdit(slug)}>
            Edit
          </button>
        </div>
      )
    }
    const tags = article.articleData.tagList.map((tag) => (
      <li key={uuidv4()} className={classes.Tag}>
        {tag}
      </li>
    ))
    const release = format(new Date(article.articleData.createdAt), 'MMMM dd, yyyy')
    return (
      <article className={classes.Article}>
        <div className={classes.Head}>
          <div className={classes.Review}>
            <div className={classes.Header}>
              <h5 className={classes.Title}>{article.articleData.title}</h5>
              <div className={classes.Likes}>
                <img
                  src={article.articleData.favorited ? Favorited : Heart}
                  onClick={(e) => likeToggler(e, article.articleData.favorited)}
                  alt="Heart-icon"
                />
                <span className={classes.LikesCounter}>{article.articleData.favoritesCount}</span>
              </div>
            </div>
            <ul className={classes.TagList}>{tags}</ul>
            <p className={classes.Description}>{article.articleData.description}</p>
          </div>
          <div className={classes.AuthorContainer}>
            <div className={classes.Author}>
              <div className={classes.AuthorInfo}>
                <h6 className={classes.Name}>{article.articleData.author.username}</h6>
                <span className={classes.Release}>{release}</span>
              </div>
              <img src={article.articleData.author.image || Avatar} alt="Avatar" className={classes.AuthorAvatar} />
            </div>
            {control}
          </div>
        </div>
        <ReactMarkdown className={classes.Body}>{article.articleData.body}</ReactMarkdown>
      </article>
    )
  }
  return <div>{article.payload || <MySpin />}</div>
}
export default Article
