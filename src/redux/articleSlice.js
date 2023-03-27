import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../services/constants'
export const fetchArticleBySlug = createAsyncThunk('article/fetchArticleBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + String(slug))
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleData: {},
    loading: true,
    error: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.articleData = action.payload.article
        state.error = false
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = true
        console.log(action.payload.message)
      })
  }
})
export default articleSlice.reducer
