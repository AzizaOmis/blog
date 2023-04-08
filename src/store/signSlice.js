import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import ErrorToast from '../components/ErrorToast/ErrorToast'
import MySpin from '../components/MySpin'
import SuccessToast from '../components/SuccessToast'
import { apiConstants, toastConstants } from '../services/constants'
export const fetchSignUp = createAsyncThunk('sign/fetchSignUp', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.signUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
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
})
export const fetchSignIn = createAsyncThunk('sign/fetchSignIn', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
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
})
export const fetchLogin = createAsyncThunk('sign/fetchLogin', async (token, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.login, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
    if (response.status === 422) {
      let res = await response.json()
      res = res.errors
      throw new Error(JSON.stringify(res))
    }
    if (response.status === 401) {
      throw new Error('Please login')
    }
    if (!response.ok) throw new Error('Something goes wrong')
    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const fetchEditProfile = createAsyncThunk('sign/fetchEditProfile', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(apiConstants.rootApi + apiConstants.login, {
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
})
export const signSlice = createSlice({
  name: 'sign',
  initialState: {
    user: {
      email: '',
      token: '',
      username: '',
      bio: '',
      image: ''
    },
    logged: false,
    payload: null
  },
  reducers: {
    logout: (state) => {
      state.logged = false
      for (let key in state.user) {
        state.user[key] = ''
      }
    },
    clearErrors: (state) => {
      state.payload = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchSignUp.fulfilled, (state) => {
        state.payload = <SuccessToast message={toastConstants.successSignUp} />
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.payload = null
        state.logged = true
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchLogin.pending, (state) => {
        state.payload = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.payload = null
        state.logged = true
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
      .addCase(fetchEditProfile.pending, (state) => {
        state.payload = <MySpin />
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.payload = <SuccessToast message={toastConstants.successUpdate} />
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.payload = <ErrorToast message={action.payload} />
      })
  }
})
export const { clearErrors, logout } = signSlice.actions
export default signSlice.reducer
