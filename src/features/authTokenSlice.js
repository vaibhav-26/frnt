import { createSlice } from "@reduxjs/toolkit";

export const authTokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },
  reducers: {
    store: (state, action) => {
      if (action?.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
      localStorage.setItem("user", action.payload.user);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    remove: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
    },
  },
});

export const { store, remove } = authTokenSlice.actions;

export const selectAuthToken = (state) => state.token.token;

export default authTokenSlice.reducer;
