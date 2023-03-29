import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiConstants } from '../services/constants'
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
    if (response.status === 401) {
      throw new Error('This user is not authorized')
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
    console.log(JSON.stringify(data.body))
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
    loading: false,
    error: false,
    errorMessage: {},
    success: null,
    logged: false
  },
  reducers: {
    logout: (state) => {
      state.logged = false
      for (let key in state.user) {
        state.user[key] = ''
      }
    },
    clearErrors: (state) => {
      state.error = false
      state.errorMessage = {}
      state.success = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = {}
        state.success = null
      })
      .addCase(fetchSignUp.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.errorMessage = {}
        state.success = true
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.loading = false
        state.error = true
        if (JSON.parse(action.payload)) {
          let res = JSON.parse(action.payload)
          for (let key in res) {
            state.errorMessage[key] = res[key]
          }
        }
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = {}
        state.success = null
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.errorMessage = {}
        state.logged = true
        state.success = true
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.loading = false
        state.error = true
        if (JSON.parse(action.payload)) {
          let res = JSON.parse(action.payload)
          for (let key in res) {
            state.errorMessage[key] = res[key]
          }
        }
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = {}
        state.success = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.errorMessage = {}
        state.logged = true
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false
        state.error = true
        if (JSON.parse(action.payload)) {
          let res = JSON.parse(action.payload)
          for (let key in res) {
            state.errorMessage[key] = res[key]
          }
        }
      })
      .addCase(fetchEditProfile.pending, (state) => {
        state.loading = true
        state.error = false
        state.errorMessage = {}
        state.success = null
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.errorMessage = {}
        state.logged = true
        state.success = true
        const { email, token, username, bio, image } = action.payload.user
        state.user.email = email
        state.user.token = token
        state.user.username = username
        state.user.bio = bio
        state.user.image = image
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.loading = false
        state.error = true
        if (JSON.parse(action.payload)) {
          let res = JSON.parse(action.payload)
          for (let key in res) {
            state.errorMessage[key] = res[key]
          }
        }
      })
  }
})
export const { clearErrors, logout } = signSlice.actions
export default signSlice.reducer
