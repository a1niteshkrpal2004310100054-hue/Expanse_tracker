import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <Toaster />
          <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
