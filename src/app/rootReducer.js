import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    isShowAlert: false,
    message: "",
    type: "success",
  },
  reducers: {
    showAlert: (state, action) => {
      const { message, type } = action.payload
      state.isShowAlert = true
      state.message = message
      state.type = type
    },
    unShowAlert: (state) => {
      state.isShowAlert = false
    }
  }
})

export default rootSlice.reducer
export const { unShowAlert, showAlert } = rootSlice.actions
export const selectIsShowAlert = (state) => state.rootReducer.isShowAlert
export const selectAlertInfo = (state) => {
  const { message, type } = state.rootReducer
  return { message, type }
}


