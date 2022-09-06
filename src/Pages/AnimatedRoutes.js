import React from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  addScaleCorrector,
} from "framer-motion";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import TodayMenu from "../Pages/TodayMenu";
import Dashboard from "../Pages/Dashboard";
import NotFound from "./NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname} >
        <Route path="/" element={<Home />}></Route>
        <Route path="/todaymenu" element={<TodayMenu />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
