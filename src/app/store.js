import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import imageReducer from "../features/imageSlice";
export default configureStore({
  reducer: {
    app: appReducer,
    image: imageReducer,
  },
});
