import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { fetchSignIn } from '../../redux/signSlice'
import { linkConstants, signConstants, toastConstants } from '../../services/constants'
import MySpin from '../MySpin'

import 'react-toastify/dist/ReactToastify.css'
import classes from './SignIn.module.scss'
const SignIn = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const signData = useSelector((state) => state.sign)
  useEffect(() => {
    if (Object.keys(signData.errorMessage).length !== 0) {
      for (let key in signData.errorMessage) {
        toast.error(key + ' ' + signData.errorMessage[key], toastConstants.params)
      }
      return
    }
    if (signData.error) {
      toast.error(toastConstants.defaultErrMessage, toastConstants.params)
    }
  }, [signData.error, signData.errorMessage])
  useEffect(() => {
    if (!signData.success) return
    toast.success(toastConstants.successSignIn, toastConstants.params)
    history.push({
      pathname: '/'
    })
  }, [signData.success])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (val) => {
    const data = {
      user: {
        email: val.email,
        password: val.password
      }
    }
    console.log(data)
    dispatch(fetchSignIn(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.SignIn}>
      <ToastContainer />
      <h4 className={classes.Title}>Sign In</h4>
      {signData.loading && <MySpin />}
      <div className={classes.Data}>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.email}>
            Email address
          </label>
          <input
            {...register(signConstants.email, {
              required: signConstants.isRequired,
              pattern: {
                value: signConstants.emailValidator,
                message: signConstants.invalidEmail
              }
            })}
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
            {...register(signConstants.password, {
              required: signConstants.isRequired,
              minLength: { value: 6, message: signConstants.passwordMinLength },
              maxLength: { value: 40, message: signConstants.passwordMaxLength }
            })}
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
