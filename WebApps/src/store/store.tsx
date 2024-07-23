import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./reducers/auth";
import { apiSlice } from "./apiSlice";
import { templateSlice } from "./reducers/template";

const reducers = combineReducers({
  auth: authSlice.reducer,
  template: templateSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["apiSlice"],
  whitelist: ["auth", "template"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(createLogger()),
});

export default store;
export const persistor = persistStore(store, {}, () => {});
