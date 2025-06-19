import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  loginUserAPI,
  logoutUserAPI,
  getProfileAPI,
  updateProfileAPI,
  getAllUsersAPI,
} from '../../api/user/auth'


export const loginUser = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const res = await loginUserAPI(data)
    return res.data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, thunkAPI) => {
  try {
    const res = await getProfileAPI()
    return res.data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile fetch failed')
  }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (data, thunkAPI) => {
  try {
    const res = await updateProfileAPI(data)
    return res.data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed')
  }
})

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await logoutUserAPI()
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed')
  }
})


export const getAllUsers = createAsyncThunk('user/getAllUsers', async (params, thunkAPI) => {
  try {
    const res = await getAllUsersAPI(params)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch users failed')
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

   
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })

      
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })


      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null
      })

 
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.total = action.payload.total
        state.loading = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export default userSlice.reducer
