import { configureStore } from "@reduxjs/toolkit";
import sliderSliceReducer from "./sliderSlice";
import layoutSliceReducer from "./layoutSlice";
import movieSliceReducer from "./movieSlice";

import loginSliceReducer from "./loginSlice";
import themeSliceReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    sliderData: sliderSliceReducer,
    layOutData: layoutSliceReducer,
    movieData: movieSliceReducer,

    loginData: loginSliceReducer,
    theme: themeSliceReducer,
  },
});
export default store;
