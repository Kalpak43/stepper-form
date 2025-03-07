import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
