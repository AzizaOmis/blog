import { combineReducers, configureStore } from '@reduxjs/toolkit'

import articleReducer from './articleSlice'
import articlesReducer from './articlesSlice'
import myArticleReducer from './myArticleSlice'
import signReducer from './signSlice'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  myArticle: myArticleReducer,
  sign: signReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
