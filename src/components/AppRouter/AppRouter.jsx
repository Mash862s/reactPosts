import React from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "../../pages/Posts";
import About from "../../pages/About";
import NotFound from "../../NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="posts" element={<Posts />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
