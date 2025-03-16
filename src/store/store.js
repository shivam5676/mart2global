import { configureStore } from "@reduxjs/toolkit";

import loginSliceReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    loginData: loginSliceReducer,
  },
});
export default store;
