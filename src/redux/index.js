import { combineReducers, configureStore } from '@reduxjs/toolkit'

import articleReducer from './articleSlice'
import articlesReducer from './articlesSlice'
import signReducer from './signSlice'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  sign: signReducer
})

export const store = configureStore({
  reducer: rootReducer
})
