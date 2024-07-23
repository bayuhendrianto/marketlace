import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setLogout } from "./reducers/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as any).auth;
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  let resultError = result.error as any;

  if (
    resultError &&
    (resultError.originalStatus === 401 || resultError.originalStatus === 403)
  ) {
    // ErrorAlert(3000, "Your session has ended. Please try logging in again!");
    api.dispatch(setLogout());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "customer",
    "auth",
    "test",
    "product",
    "category",
    "transaction",
    "shopping-cart",
  ],
  endpoints: (builder) => ({}),
});
