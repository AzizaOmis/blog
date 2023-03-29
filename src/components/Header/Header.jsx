import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Avatar from '../../icons/Avatar.svg'
import { clearErrors, logout } from '../../redux/signSlice'
import { linkConstants } from '../../services/constants'

import classes from './Header.module.scss'

const Header = () => {
  let history = useHistory()
  let location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      history.push({
        pathname: '/articles/'
      })
    }
  })
  const dispatch = useDispatch()
  const logged = useSelector((state) => state.sign.logged)
  const userInfo = useSelector((state) => state.sign.user)
  const onLogout = () => {
    dispatch(clearErrors())
    dispatch(logout())
  }
  const rendering = logged ? (
    <React.Fragment>
      <button className={classes.CreateArticle} type="button">
        <a>
          <span className={classes.GreenText}>Create article</span>
        </a>
      </button>
      <Link to={linkConstants.profile}>
        <div className={classes.User} onClick={() => dispatch(clearErrors())}>
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
      <button onClick={() => dispatch(clearErrors())} className={classes.SignIn} type="button">
        <Link to={linkConstants.signIn}>
          <span className={classes.DefaultText}>Sign In</span>
        </Link>
      </button>
      <button onClick={() => dispatch(clearErrors())} className={classes.SignUp} type="button">
        <Link to={linkConstants.signUp}>
          <span className={classes.GreenText}>Sign Up</span>
        </Link>
      </button>
    </React.Fragment>
  )
  return (
    <div className={classes.Header}>
      <span className={classes.Name}>Realworld Blog</span>
      {rendering}
    </div>
  )
}
export default Header
