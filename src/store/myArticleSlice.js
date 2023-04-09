import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import ErrorToast from '../components/ErrorToast/ErrorToast'
import MySpin from '../components/MySpin'
import SuccessToast from '../components/SuccessToast'
import { apiConstants, toastConstants } from '../services/constants'
export const fetchPostMyArticle = createAsyncThunk(
  'myArticle/fetchPostMyArticle',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.postNewArticle, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`
        },
        body: JSON.stringify(data.body)
      })
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
export const fetchEditMyArticle = createAsyncThunk(
  'myArticle/fetchEditMyArticle',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`
        },
        body: JSON.stringify(data.body)
      })
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
export const fetchDeleteMyArticle = createAsyncThunk(
  'myArticle/fetchDeleteMyArticle',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConstants.rootApi + apiConstants.getArticleBySlug + data.slug, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data.token}`
        }
      })
      if (response.status === 204) return
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
export const myArticleSlice = createSlice({
  name: 'myArticle',
  initialState: {
    payload: null
  },
  reducers: {
    clearMyArticlePayload: (state) => {
      state.payload = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostMyArticle.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchPostMyArticle.fulfilled, (state) => {
        state.payload = <SuccessToast message={toastConstants.successCreateArticle} />
      })
      .addCase(fetchPostMyArticle.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchEditMyArticle.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchEditMyArticle.fulfilled, (state) => {
        state.payload = <SuccessToast message={toastConstants.successEditArticle} />
      })
      .addCase(fetchEditMyArticle.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchDeleteMyArticle.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchDeleteMyArticle.fulfilled, (state) => {
        state.payload = null
      })
      .addCase(fetchDeleteMyArticle.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
  }
})
export const { clearMyArticlePayload } = myArticleSlice.actions
export default myArticleSlice.reducer
