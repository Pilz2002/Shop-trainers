import { createSlice } from "@reduxjs/toolkit";

const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState: {
    isLogin: false,
    isLoading: false,
    userInfo: {}
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {}
    },
    loading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export default loginPageSlice.reducer;
export const { login, logout, loading } = loginPageSlice.actions
export const selectIsLogin = (state) => state.loginPageReducer.isLogin
export const selectUserInfo = (state) => state.loginPageReducer.userInfo

