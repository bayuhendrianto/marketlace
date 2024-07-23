import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { SnackbarCloseButton } from "./components/alert.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={5}
        action={(snackbarKey: SnackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
