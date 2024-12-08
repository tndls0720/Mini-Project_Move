import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import MainPage from "../pages/MainPage";
import MovieDetail from "../component/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="about" element={<div>About Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
