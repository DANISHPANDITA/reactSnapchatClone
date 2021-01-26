import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    openedImage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    openImage: (state, action) => {
      state.openedImage = action.payload;
    },
    closeImage: (state) => {
      state.openedImage = null;
    },
  },
});

export const { openImage, closeImage, login, logout } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const ImageOpen = (state) => state.app.openedImage;

export default appSlice.reducer;
