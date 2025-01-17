import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    signInStart: (state) => {
      state.loading = true
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    signInFailure: (state, action) => {
        state.loading = false;
      state.error = action.payload
    },

    updateStart: (state) => {
      state.loading = true
    },

    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },

    deleteStart: (state) => {
      state.loading = true
    },

    deleteSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  signInStart , 
  signInSuccess,  
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure
} = userSlice.actions

export default userSlice.reducer