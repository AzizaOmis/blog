import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ArticleCard from '../ArticleCard'
import ArticleList from '../ArticleList'
import Header from '../Header'
import MyPagination from '../MyPagination'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

import classes from './App.module.scss'

export default function App() {
  return (
    <section className={classes.App}>
      <Router>
        <Route path="/" component={Header} />
        <section className={classes.Main}>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route exact strict path="/articles/" component={ArticleList} />
          <Route exact strict path="/articles/" component={MyPagination} />
          <Route
            path="/articles/:slug"
            exact
            render={({ match }) => {
              return <ArticleCard slug={match.params.slug} />
            }}
          />
        </section>
      </Router>
    </section>
  )
}
