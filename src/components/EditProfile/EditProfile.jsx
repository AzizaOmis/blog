import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { signConstants } from '../../services/constants'
import { fetchEditProfile } from '../../store/signSlice'

import classes from './EditProfile.module.scss'
const EditProfile = () => {
  const dispatch = useDispatch()
  const signData = useSelector((state) => state.sign)
  const validation = Yup.object().shape({
    username: Yup.string()
      .required(signConstants.isRequired)
      .matches(signConstants.usernameValidator, signConstants.invalidUsername)
      .min(3, signConstants.usernameMinLength)
      .max(20, signConstants.usernameMaxLength),
    email: Yup.string()
      .required(signConstants.isRequired)
      .matches(signConstants.emailValidator, signConstants.invalidEmail),
    password: Yup.string()
      .required(signConstants.isRequired)
      .min(6, signConstants.passwordMinLength)
      .max(40, signConstants.passwordMaxLength),
    image: Yup.string().url(signConstants.invalidImage)
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
          username: val.username.trim(),
          email: val.email.trim(),
          password: val.password
        }
      },
      token: signData.user.token
    }
    if (val.image.trim() !== '') {
      data.body.user.image = val.image.trim()
    }
    dispatch(fetchEditProfile(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Edit}>
      {signData.payload}
      <h4 className={classes.Title}>Edit Profile</h4>
      <div className={classes.Data}>
        <div className={classes.Form}>
          <label className={classes.Label} htmlFor={signConstants.username}>
            Username
          </label>
          <input
            {...register(signConstants.username)}
            defaultValue={signData.user.username}
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
            defaultValue={signData.user.email}
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
