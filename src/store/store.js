import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { patientsApi } from './services/patientsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [patientsApi.reducerPath]: patientsApi.reducer
  },
  middleware: (gDM) => gDM().concat(patientsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
