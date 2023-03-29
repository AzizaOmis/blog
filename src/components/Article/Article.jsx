import React from 'react'
import format from 'date-fns/format'
import Markdown from 'markdown-to-jsx'
import { v4 as uuidv4 } from 'uuid'

import Avatar from '../../icons/Avatar.svg'
import Favorited from '../../icons/Favorited.svg'
import Heart from '../../icons/Heart.svg'
import { clippingText } from '../../services/helperFns'

import classes from './Article.module.scss'
const Article = ({ preview, title, description, body, tagList, createdAt, favorited, favoritesCount, author }) => {
  const tags = tagList.map((tag) => (
    <li key={uuidv4()} className={classes.Tag}>
      {preview ? clippingText(tag, 20) : tag}
    </li>
  ))
  const release = format(new Date(createdAt), 'MMMM dd, yyyy')
  return (
    <article className={preview ? `${classes.Article} ${classes.Preview}` : `${classes.Article}`}>
      <div className={classes.Head}>
        <div className={classes.Review}>
          <div className={classes.Header}>
            <h5 className={classes.Title}>{preview ? clippingText(title, 40) : title}</h5>
            <div className={classes.Likes}>
              <img src={favorited ? Favorited : Heart} alt="Heart-icon" />
              <span className={classes.LikesCounter}>{favoritesCount}</span>
            </div>
          </div>
          <ul className={classes.TagList}>{tags}</ul>
          <p className={classes.Description}>{preview ? clippingText(description, 200) : description}</p>
        </div>
        <div className={classes.Author}>
          <div className={classes.AuthorInfo}>
            <h6 className={classes.Name}>{author.username}</h6>
            <span className={classes.Release}>{release}</span>
          </div>
          <img src={author.image || Avatar} alt="Avatar" className={classes.AuthorAvatar} />
        </div>
      </div>
      {preview ? null : (
        <div className={classes.Body}>
          <p className={classes.Text}>
            <Markdown>{body}</Markdown>
          </p>
        </div>
      )}
    </article>
  )
}
export default Article
