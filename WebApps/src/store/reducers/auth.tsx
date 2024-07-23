import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { navigation } from "../../components/navigation";
import { findCommonObjects } from "../../services/utils.service";

export interface AuthState {
  authentication?: {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    role: {
      id: string;
      name: string;
      permissions: any[];
    };
  };
  accessToken: undefined;
  menuItem?: any[];
  isLoggedIn?: boolean;
}

const initialState: AuthState = {
  authentication: undefined,
  accessToken: undefined,
  menuItem: navigation,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (
      state,
      action: PayloadAction<{
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        role: {
          id: string;
          name: string;
          permissions: any[];
        };
        accessToken: any;
      }>
    ) => {
      const { email, id, firstName, lastName, role, accessToken } =
        action.payload;

      state.authentication = {
        email: email,
        id: id,
        firstName: firstName,
        lastName: lastName,
        role: role,
      };
      state.accessToken = accessToken;

      // state.menuItem = navigation;

      state.menuItem = findCommonObjects(navigation, role.permissions, "name");

      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.authentication = undefined;
      state.menuItem = [] as any;
      state.isLoggedIn = false;
      state.accessToken = undefined;

      Object.keys(Cookies.get()).forEach((cookie) => {
        Cookies.remove(cookie);
      });
    },
  },
});

export const { setAuthentication, setLogout } = authSlice.actions;

export default authSlice.reducer;
