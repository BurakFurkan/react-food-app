import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TodayMenu from "./Pages/TodayMenu";
import Dashboard from "./Pages/Dashboard";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
        <Route path="/todaymenu" element={<TodayMenu />}>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
