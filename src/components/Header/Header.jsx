import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Avatar from '../../icons/Avatar.svg'
import { linkConstants } from '../../services/constants'
import { clearArticleData } from '../../store/articleSlice'
import { clearMyArticlePayload } from '../../store/myArticleSlice'
import { clearSignPayload, logout } from '../../store/signSlice'

import classes from './Header.module.scss'

const Header = () => {
  let history = useHistory()
  let location = useLocation()
  useEffect(() => {
    if (location.pathname === linkConstants.default) {
      history.push({
        pathname: linkConstants.articles
      })
    }
  })
  const dispatch = useDispatch()
  const logged = useSelector((state) => state.sign.logged)
  const userInfo = useSelector((state) => state.sign.user)
  const clearData = () => {
    dispatch(clearArticleData())
    dispatch(clearMyArticlePayload())
  }
  const onLogout = () => {
    dispatch(clearSignPayload())
    dispatch(logout())
    clearData()
  }
  const onEdit = () => {
    dispatch(clearSignPayload())
    clearData()
  }
  const rendering = logged ? (
    <React.Fragment>
      <button className={classes.CreateArticle} type="button" onClick={clearData}>
        <Link to={linkConstants.newArticle}>
          <span className={classes.GreenText}>Create article</span>
        </Link>
      </button>
      <Link to={linkConstants.profile}>
        <div className={classes.User} onClick={onEdit}>
          <span className={classes.DefaultText}>{userInfo.username}</span>
          <img src={userInfo.image || Avatar} alt="Avatar" className={classes.Avatar} />
        </div>
      </Link>
      <button className={classes.LogOut} onClick={onLogout} type="button">
        <Link to={linkConstants.signIn}>
          <span className={classes.DefaultText}>Log Out</span>
        </Link>
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <button onClick={() => dispatch(clearSignPayload())} className={classes.SignIn} type="button">
        <Link to={linkConstants.signIn}>
          <span className={classes.DefaultText}>Sign In</span>
        </Link>
      </button>
      <button onClick={() => dispatch(clearSignPayload())} className={classes.SignUp} type="button">
        <Link to={linkConstants.signUp}>
          <span className={classes.GreenText}>Sign Up</span>
        </Link>
      </button>
    </React.Fragment>
  )
  return (
    <div className={classes.Header}>
      <Link to={linkConstants.default} onClick={clearData}>
        <span className={classes.Name}>Realworld Blog</span>
      </Link>
      {rendering}
    </div>
  )
}
export default Header
