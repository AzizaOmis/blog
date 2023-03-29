import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { fetchEditProfile } from '../../redux/signSlice'
import { signConstants, toastConstants } from '../../services/constants'

import classes from './EditProfile.module.scss'
const EditProfile = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const userInfo = useSelector((state) => state.sign.user)
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
    toast.success(toastConstants.successUpdate, toastConstants.params)
    history.push({
      pathname: '/'
    })
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
    image: Yup.string()
      .required(signConstants.isRequired)
      .test(signConstants.image, signConstants.invalidImage, (val) => {
        try {
          new URL(val)
          return true
        } catch (err) {
          return false
        }
      })
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validation) })
  const onSubmit = (val) => {
    const data = {
      body: {
        user: {
          username: val.username,
          email: val.email,
          password: val.password,
          image: val.image
        }
      },
      token: userInfo.token
    }
    dispatch(fetchEditProfile(data))
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Edit}>
      <ToastContainer />
      <h4 className={classes.Title}>Edit Profile</h4>
      <div className={classes.Data}>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.username}>
            Username
          </label>
          <input
            {...register(signConstants.username)}
            defaultValue={userInfo.username}
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
            defaultValue={userInfo.email}
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
            New password
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
          <label className={classes.Label} htmlFor={signConstants.image}>
            Avatar image (url)
          </label>
          <input
            {...register(signConstants.image)}
            className={classes.Input}
            id={signConstants.image}
            name={signConstants.image}
            placeholder={signConstants.imagePlaceholder}
          />
          {errors.image && <span className={classes.Error}>{errors.image?.message}</span>}
        </div>
      </div>
      <input className={classes.Submit} type="submit" value={signConstants.save} />
    </form>
  )
}
export default EditProfile
