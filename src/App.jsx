import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import MovieDetail from "../component/MovieDetail";

function App() {
  return (
    <Routes>
      {/* 메인 페이지 경로 */}
      <Route path="/" element={<Layout />} />

      {/* 영화 상세 정보 경로 */}
      <Route path="/details/:id" element={<MovieDetail />} />

      {/* About 페이지 경로 */}
      <Route path="/about" element={<div>About Page</div>} />
    </Routes>
  );
}

export default App;
