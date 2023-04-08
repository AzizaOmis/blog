import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { signConstants } from '../../services/constants'
import { fetchEditMyArticle, fetchPostMyArticle } from '../../store/myArticleSlice'
import MyAlert from '../MyAlert'

import classes from './MyArticle.module.scss'
const MyArticle = ({ edit }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.sign.user.token)
  const myArticlePayload = useSelector((state) => state.myArticle.payload)
  const article = useSelector((state) => state.article)
  const validation = Yup.object().shape({
    title: Yup.string().required(signConstants.isRequired).max(5000, signConstants.titleMaxLength),
    description: Yup.string().required(signConstants.isRequired),
    text: Yup.string().required(signConstants.isRequired),
    tags: Yup.array(
      Yup.object({
        name: Yup.string().required().max(50)
      })
    )
  })
  let defValues = {
    tags: [{ name: '' }]
  }
  let fetchFunc = fetchPostMyArticle
  if (edit) {
    if (!article.articleData.slug) {
      return <MyAlert message="An error occurred due to a network interruption" />
    }
    let arr = []
    article.articleData.tagList.forEach((item) => {
      arr.push({ name: `${item}` })
    })
    defValues = {
      tags: arr
    }
    fetchFunc = fetchEditMyArticle
  }
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defValues,
    resolver: yupResolver(validation)
  })
  const { remove, append, fields } = useFieldArray({ control, name: 'tags' })
  const onSubmit = (val) => {
    const data = {
      body: {
        article: {
          title: val.title,
          description: val.description,
          body: val.text,
          tagList: []
        }
      },
      token: token
    }
    if (edit) {
      data.slug = article.articleData.slug
    }
    val.tags.forEach((item) => {
      data.body.article.tagList.push(item.name)
    })
    console.log(data)
    dispatch(fetchFunc(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.MyArticle}>
      <h4 className={classes.Name}>{edit ? 'Edit article' : 'Create new article'}</h4>
      {myArticlePayload}
      <div className={classes.Form}>
        <label className={classes.Label}>Title</label>
        <input
          {...register(signConstants.title)}
          className={classes.Input}
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={edit && article.articleData.title}
        />
        {errors.title && <span className={classes.Error}>{errors.title?.message}</span>}
      </div>
      <div className={classes.Form}>
        <label className={classes.Label} htmlFor="description">
          Short description
        </label>
        <input
          {...register(signConstants.description)}
          className={classes.Input}
          type="text"
          name="description"
          placeholder="Short description"
          defaultValue={edit && article.articleData.description}
        />
        {errors.description && <span className={classes.Error}>{errors.description?.message}</span>}
      </div>
      <div className={classes.Form}>
        <label className={classes.Label}>Text</label>
        <textarea
          {...register(signConstants.text)}
          className={`${classes.Input} ${classes.Textarea}`}
          name="text"
          placeholder="Text"
          defaultValue={edit && article.articleData.body}
        />
        {errors.text && <span className={classes.Error}>{errors.text?.message}</span>}
      </div>
      <div className={classes.Form}>
        <p className={classes.Label}>Tags</p>
        <div className={classes.TagContainer}>
          <ul className={classes.TagList}>
            {fields.map((item, index) => (
              <li key={item.id} className={classes.TagItem}>
                <input className={`${classes.Input} ${classes.TagInput}`} {...register(`tags.${index}.name`)} />
                <button className={`${classes.Button} ${classes.Delete}`} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => append()} className={`${classes.Button} ${classes.AddTag}`}>
            Add tag
          </button>
        </div>
        {errors.tags && <span className={classes.Error}>{signConstants.tagError}</span>}
        <input type="submit" value="Send" className={classes.Submit}></input>
      </div>
    </form>
  )
}
export default MyArticle
