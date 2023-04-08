import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { linkConstants } from '../../services/constants'
import { fetchLogin } from '../../store/signSlice'
import Article from '../Article'
import ArticleList from '../ArticleList'
import EditProfile from '../EditProfile'
import Header from '../Header'
import MyArticle from '../MyArticle'
import MyPagination from '../MyPagination'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.sign.user.token)
  useEffect(() => {
    if (!localStorage.getItem('token')) return
    if (localStorage.getItem('token') !== '') {
      const token = localStorage.getItem('token')
      dispatch(fetchLogin(token))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <section className={classes.App}>
      <Router>
        <Route path="/" component={Header} />
        <section className={classes.Main}>
          <Route path={linkConstants.signIn} component={SignIn} />
          <Route path={linkConstants.signUp} component={SignUp} />
          <Route path={linkConstants.profile} component={EditProfile} />
          <Route exact strict path="/articles/" component={ArticleList} />
          <Route exact strict path="/articles/" component={MyPagination} />
          <Route
            path="/articles/:slug"
            exact
            render={({ match }) => {
              return <Article slug={match.params.slug} />
            }}
          />
          <Route
            path="/articles/:slug/edit"
            exact
            render={({ match }) => {
              return <MyArticle edit={true} slug={match.params.slug} />
            }}
          />
          <Route path={linkConstants.newArticle} component={MyArticle} />
        </section>
      </Router>
    </section>
  )
}
export default App
