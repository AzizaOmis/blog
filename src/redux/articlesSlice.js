import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../services/constants'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  try {
    const response = await fetch(
      apiConstants.rootApi + apiConstants.getArticles + apiConstants.limit + apiConstants.offset + String(offset)
    )
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    currentPage: 1,
    articlesCount: 25,
    loading: false,
    error: false
  },
  reducers: {
    onPaginationClick: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.error = false
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = true
        console.log(action.payload.message)
      })
  }
})
export const { onPaginationClick } = articlesSlice.actions
export default articlesSlice.reducer
