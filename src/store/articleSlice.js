import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import ErrorToast from '../components/ErrorToast'
import MySpin from '../components/MySpin'
import { apiConstants, toastConstants } from '../services/constants'
export const fetchArticleBySlug = createAsyncThunk('article/fetchArticleBySlug', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + String(data.slug), {
      method: 'GET',
      headers: {
        Authorization: `Token ${data.token}`
      }
    })
    if (!response.ok) {
      throw new Error(toastConstants.defaultErrMessage)
    }
    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const fetchPostFavorite = createAsyncThunk('myArticle/fetchPostFavorite', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(
      apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug + apiConstants.favorite,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`
        }
      }
    )
    if (response.status === 422) {
      let res = await response.json()
      res = res.errors
      throw new Error(JSON.stringify(res))
    }
    if (!response.ok) throw new Error('Something goes wrong')
    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const fetchDeleteFavorite = createAsyncThunk(
  'myArticle/fetchDeleteFavorite',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug + apiConstants.favorite,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Token ${data.token}`
          }
        }
      )
      if (response.status === 422) {
        let res = await response.json()
        res = res.errors
        throw new Error(JSON.stringify(res))
      }
      if (!response.ok) throw new Error('Something goes wrong')
      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleData: {},
    payload: null,
    success: null
  },
  reducers: {
    clearArticlePayload: (state) => {
      state.payload = null
      state.success = null
    },
    clearArticleData: (state) => {
      state.payload = null
      state.success = null
      state.articleData = {}
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
      .addCase(fetchPostFavorite.pending, (state) => {
        state.payload = <MySpin />
        state.success = null
        state.articleData = {}
      })
      .addCase(fetchPostFavorite.fulfilled, (state, action) => {
        state.payload = null
        state.success = true
        state.articleData = action.payload.article
      })
      .addCase(fetchPostFavorite.rejected, (state, action) => {
        state.success = null
        state.articleData = {}
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchDeleteFavorite.pending, (state) => {
        state.payload = <MySpin />
        state.success = null
        state.articleData = {}
      })
      .addCase(fetchDeleteFavorite.fulfilled, (state, action) => {
        state.payload = null
        state.success = true
        state.articleData = action.payload.article
      })
      .addCase(fetchDeleteFavorite.rejected, (state, action) => {
        state.success = null
        state.articleData = {}
        state.payload = <ErrorToast message={action.payload} />
      })
  }
})
export const { clearArticlePayload, clearArticleData } = articleSlice.actions
export default articleSlice.reducer
