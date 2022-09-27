import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import TodayMenu from "../Pages/TodayMenu";
import Dashboard from "../Pages/Dashboard";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import { useSelector} from "react-redux";

const AnimatedRoutes = () => {
  const { isLoggedIn } = useSelector((reduxStore) => reduxStore.user);

  const location = useLocation();

  if (isLoggedIn) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todaymenu" element={<TodayMenu />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<LoginPage />}></Route>
        </Routes>
      </AnimatePresence>
    );
  }
};

export default AnimatedRoutes;
