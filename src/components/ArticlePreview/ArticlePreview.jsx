import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import format from 'date-fns/format'
import { v4 as uuidv4 } from 'uuid'

import Avatar from '../../icons/Avatar.svg'
import Favorited from '../../icons/Favorited.svg'
import Heart from '../../icons/Heart.svg'
import { linkConstants } from '../../services/constants'
import { clippingText } from '../../services/helperFns'
import { fetchDeleteFavorite, fetchPostFavorite } from '../../store/articleSlice'
import { fetchArticles } from '../../store/articlesSlice'

import classes from './ArticlePreview.module.scss'
const ArticlePreview = ({ data }) => {
  const dispatch = useDispatch()
  let history = useHistory()
  const token = useSelector((state) => state.sign.user.token)
  const offset = useSelector((state) => state.articles.currentPage)
  const likeToggler = (slug, e, favorited) => {
    e.stopPropagation()
    e.preventDefault()
    if (token === '' && localStorage.token === '') {
      history.push({ pathname: linkConstants.signIn })
      return
    }
    const data = {
      slug,
      token
    }
    if (favorited) dispatch(fetchDeleteFavorite(data))
    if (!favorited) dispatch(fetchPostFavorite(data))
    const dataForArticles = {
      token,
      offset: (offset - 1) * 5
    }
    setTimeout(() => dispatch(fetchArticles(dataForArticles)), 400)
  }
  const tags = data.tagList.map((tag) => (
    <li key={uuidv4()} className={classes.Tag}>
      {clippingText(tag, 20)}
    </li>
  ))
  const release = format(new Date(data.createdAt), 'MMMM dd, yyyy')
  return (
    <article className={classes.Preview}>
      <div className={classes.Review}>
        <div className={classes.Header}>
          <h5 className={classes.Title}>{clippingText(data.title, 40)}</h5>
          <div className={classes.Likes}>
            <img
              src={data.favorited ? Favorited : Heart}
              alt="Heart-icon"
              onClick={(e) => likeToggler(data.slug, e, data.favorited)}
            />
            <span className={classes.LikesCounter}>{data.favoritesCount}</span>
          </div>
        </div>
        <ul className={classes.TagList}>{tags}</ul>
        <p className={classes.Description}>{clippingText(data.description, 200)}</p>
      </div>
      <div className={classes.Author}>
        <div className={classes.AuthorInfo}>
          <h6 className={classes.Name}>{data.author.username}</h6>
          <span className={classes.Release}>{release}</span>
        </div>
        <img src={data.author.image || Avatar} alt="Avatar" className={classes.AuthorAvatar} />
      </div>
    </article>
  )
}
export default ArticlePreview
