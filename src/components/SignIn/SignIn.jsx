import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { linkConstants, signConstants } from '../../services/constants'

import classes from './SignIn.module.scss'
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.SignIn}>
      <h4 className={classes.Title}>Create new account</h4>
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
