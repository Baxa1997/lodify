import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: false,
};

export const { actions: sidebarActions, reducer: sidebarReducer } = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state, { payload }) => {
      state.sidebar = payload ?? false;
    },
  },
});
