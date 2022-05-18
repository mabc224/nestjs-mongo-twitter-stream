import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value: 0,
}

export const alertSlice = createSlice({
 name: 'alert',
 initialState,
 reducers: {
  info: (state) => {
   // Redux Toolkit allows us to write "mutating" logic in reducers. It
   // doesn't actually mutate the state because it uses the Immer library,
   // which detects changes to a "draft state" and produces a brand new
   // immutable state based off those changes
   state.value = 'Info'
  },
  error: (state) => {
   state.value = 'Error'
  },
 },
})

// Action creators are generated for each case reducer function
export const {info, error} = alertSlice.actions

export default alertSlice.reducer