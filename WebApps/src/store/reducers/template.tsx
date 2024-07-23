import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { navigation } from "../../components/navigation";

const initialState = {
  sidebarShow: true,
  theme: "light",
  sidebarUnfoldable: true,
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload.sidebarShow;
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload.sidebarUnfoldable;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setSidebarShow, setTheme, setSidebarUnfoldable } =
  templateSlice.actions;

export default templateSlice.reducer;
