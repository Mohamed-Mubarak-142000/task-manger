import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  isOpenSidebar: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logoutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isOpenSidebar = action.payload;
    },
  },
});

export const { setCredentials, setOpenSidebar, logoutUser } = authSlice.actions;
export default authSlice.reducer;
