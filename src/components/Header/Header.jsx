import React from 'react'
import { Link } from 'react-router-dom'

import { linkConstants } from '../../services/constants'

import classes from './Header.module.scss'

export default function Header() {
  return (
    <div className={classes.Header}>
      <span className={classes.Name}>Realworld Blog</span>
      <button className={classes.SignIn}>
        <Link to={linkConstants.signIn}>
          <span className={classes.SignInText}>Sign In</span>
        </Link>
      </button>
      <button className={classes.SignUp}>
        <Link to={linkConstants.signUp}>
          <span className={classes.SignUpText}>Sign Up</span>
        </Link>
      </button>
    </div>
  )
}
