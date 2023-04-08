import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import ErrorToast from '../components/ErrorToast'
import MySpin from '../components/MySpin'
import { apiConstants, toastConstants } from '../services/constants'
export const fetchArticleBySlug = createAsyncThunk('article/fetchArticleBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + String(slug))
    if (!response.ok) {
      throw new Error(toastConstants.defaultErrMessage)
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleData: {},
    payload: null,
    success: null
  },
  reducers: {
    clearData: (state) => {
      state.payload = null
      state.success = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.payload = <MySpin />
        state.success = null
        state.articleData = {}
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.payload = null
        state.articleData = action.payload.article
        state.success = true
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.success = null
        state.articleData = {}
        state.payload = <ErrorToast message={action.payload} />
      })
  }
})
export const { clearData } = articleSlice.actions
export default articleSlice.reducer
