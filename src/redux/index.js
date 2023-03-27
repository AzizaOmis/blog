import { combineReducers, configureStore } from '@reduxjs/toolkit'

import articleReducer from './articleSlice'
import articlesReducer from './articlesSlice'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer
})

export const store = configureStore({
  reducer: rootReducer
})
