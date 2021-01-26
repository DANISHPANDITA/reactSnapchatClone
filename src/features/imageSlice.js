import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    resetImage: (state) => {
      state.image = null;
    },
  },
});

export const { setImage, resetImage } = imageSlice.actions;

export const selectimage = (state) => state.image.image;

export default imageSlice.reducer;
