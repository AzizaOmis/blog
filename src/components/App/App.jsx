import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { apiConstants, linkConstants } from '../../services/constants'
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
  const logged = useSelector((state) => state.sign.logged)
  useEffect(() => {
    if (!localStorage.getItem(apiConstants.token)) return
    if (localStorage.getItem(apiConstants.token) !== '') {
      const token = localStorage.getItem(apiConstants.token)
      dispatch(fetchLogin(token))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(apiConstants.token, token)
  }, [token])
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          logged ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: linkConstants.signIn,
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }
  return (
    <section className={classes.App}>
      <Router>
        <Route path={linkConstants.default} component={Header} />
        <section className={classes.Main}>
          <Route path={linkConstants.signIn} exact strict component={SignIn} />
          <Route path={linkConstants.signUp} exact strict component={SignUp} />
          <PrivateRoute path={linkConstants.profile} exact strict>
            <EditProfile />
          </PrivateRoute>
          <Route exact path={linkConstants.articles} component={ArticleList} />
          <Route exact path={linkConstants.articles} component={MyPagination} />
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
          <PrivateRoute path={linkConstants.newArticle} exact strict>
            <MyArticle />
          </PrivateRoute>
        </section>
      </Router>
    </section>
  )
}
export default App
