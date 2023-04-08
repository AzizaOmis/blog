import React from 'react'
import format from 'date-fns/format'
import { v4 as uuidv4 } from 'uuid'

import Avatar from '../../icons/Avatar.svg'
import Favorited from '../../icons/Favorited.svg'
import Heart from '../../icons/Heart.svg'
import { clippingText } from '../../services/helperFns'

import classes from './ArticlePreview.module.scss'
const ArticlePreview = ({ data }) => {
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
            <img src={data.favorited ? Favorited : Heart} alt="Heart-icon" />
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
