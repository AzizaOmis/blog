import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { fetchSignUp } from '../../redux/signSlice'
import { linkConstants, signConstants, toastConstants } from '../../services/constants'
import MySpin from '../MySpin'

import 'react-toastify/dist/ReactToastify.css'
import classes from './SignUp.module.scss'
const SignUp = () => {
  const dispatch = useDispatch()
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
    toast.success(toastConstants.successSignUp, toastConstants.params)
  }, [signData.success])
  const validation = Yup.object().shape({
    username: Yup.string()
      .required(signConstants.isRequired)
      .matches(signConstants.usernameValidator, signConstants.invalidUsername)
      .test(signConstants.username, signConstants.usernameMinLength, (val) => val.length >= 3)
      .test(signConstants.username, signConstants.usernameMaxLength, (val) => val.length <= 20),
    email: Yup.string()
      .required(signConstants.isRequired)
      .matches(signConstants.emailValidator, signConstants.invalidEmail),
    password: Yup.string()
      .required(signConstants.isRequired)
      .test(signConstants.password, signConstants.passwordMinLength, (val) => val.length >= 6)
      .test(signConstants.password, signConstants.passwordMaxLength, (val) => val.length <= 40),
    confirm_password: Yup.string()
      .required(signConstants.isRequired)
      .oneOf([Yup.ref(signConstants.password)], signConstants.mismatchPassword),
    agreement: Yup.bool().oneOf([true], signConstants.isRequired)
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validation) })
  const onSubmit = (val) => {
    const data = {
      user: {
        username: val.username,
        email: val.email,
        password: val.password
      }
    }
    console.log(data)
    dispatch(fetchSignUp(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.SignUp}>
      <ToastContainer />
      <h4 className={classes.Title}>Create new account</h4>
      {signData.loading && <MySpin />}
      <div className={classes.Data}>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.username}>
            Username
          </label>
          <input
            {...register(signConstants.username)}
            className={classes.Input}
            type="text"
            id={signConstants.username}
            name={signConstants.username}
            placeholder={signConstants.usernamePlaceholder}
          />
          {errors.username && <span className={classes.Error}>{errors.username?.message}</span>}
        </div>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.email}>
            Email address
          </label>
          <input
            {...register(signConstants.email)}
            className={classes.Input}
            type={signConstants.email}
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
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.confirm_password}>
            Repeat Password
          </label>
          <input
            {...register(signConstants.confirm_password)}
            className={classes.Input}
            type={signConstants.password}
            id={signConstants.confirm_password}
            name={signConstants.confirm_password}
            placeholder={signConstants.passwordPlaceholder}
          />
          {errors.confirm_password && <span className={classes.Error}>{errors.confirm_password?.message}</span>}
        </div>
      </div>
      <div className={classes.Form}>
        <div className={classes.Agreement}>
          <input
            {...register(signConstants.agreement)}
            className={classes.Agree}
            type="checkbox"
            id={signConstants.agreement}
            name={signConstants.agreement}
          />
          <label htmlFor={signConstants.agreement}>I agree to the processing of my personal information</label>
        </div>
        {errors.agreement && <span className={classes.Error}>{errors.agreement?.message}</span>}
      </div>
      <input className={classes.Submit} type="submit" value={signConstants.create} />
      <span className={classes.Note}>
        Already have an account?
        <Link to={linkConstants.signIn}>
          <span className={classes.SignIn}>Sign In.</span>
        </Link>
      </span>
    </form>
  )
}
export default SignUp
