import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token?: string | null
  role?: string | null
  user?: any | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; role: string; user?: any }>) {
      state.token = action.payload.token
      state.role = action.payload.role
      state.user = action.payload.user || null
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('role', action.payload.role)
    },
    clearAuth(state) {
      state.token = null
      state.role = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
