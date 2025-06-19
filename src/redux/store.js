import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/userslice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})
