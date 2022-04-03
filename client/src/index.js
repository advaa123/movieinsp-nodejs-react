import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.render(
  <BrowserRouter>
    <LoadingProvider>
      <UserProvider>
        <FavoritesProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Provider>
        </FavoritesProvider>
      </UserProvider>
    </LoadingProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
