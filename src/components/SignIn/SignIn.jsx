import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { linkConstants, signConstants } from '../../services/constants'
import { fetchSignIn } from '../../store/signSlice'

import classes from './SignIn.module.scss'
const SignIn = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const signData = useSelector((state) => state.sign)
  useEffect(() => {
    if (signData.logged) {
      history.push({
        pathname: linkConstants.default
      })
    }
  }, [signData.logged])
  const validation = Yup.object().shape({
    email: Yup.string()
      .required(signConstants.isRequired)
      .email(signConstants.invalidEmail)
      .matches(signConstants.emailValidator, signConstants.invalidEmail),
    password: Yup.string()
      .required(signConstants.isRequired)
      .min(6, signConstants.passwordMinLength)
      .max(40, signConstants.passwordMaxLength)
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validation) })
  const onSubmit = (val) => {
    const data = {
      user: {
        email: val.email,
        password: val.password
      }
    }
    dispatch(fetchSignIn(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.SignIn}>
      <h4 className={classes.Title}>Sign In</h4>
      {signData.payload}
      <div className={classes.Data}>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.email}>
            Email address
          </label>
          <input
            {...register(signConstants.email)}
            className={classes.Input}
            type="text"
            id={signConstants.email}
            name={signConstants.email}
            placeholder={signConstants.emailPlaceholder}
          />
          {errors.email && <span className={classes.Error}>{errors.email?.message}</span>}
        </div>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.password}>
            Password
          </label>
          <input
            {...register(signConstants.password)}
            className={classes.Input}
            type={signConstants.password}
            id={signConstants.password}
            name={signConstants.password}
            placeholder={signConstants.passwordPlaceholder}
          />
          {errors.password && <span className={classes.Error}>{errors.password?.message}</span>}
        </div>
      </div>
      <input className={classes.Submit} type="submit" value={signConstants.login} />
      <span className={classes.Note}>
        Don`t have an account?{' '}
        <Link to={linkConstants.signUp}>
          <span className={classes.SignUp}>Sign Up.</span>
        </Link>
      </span>
    </form>
  )
}
export default SignIn
