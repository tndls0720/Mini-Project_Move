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
        {/* 영화 상세 정보를 위한 동적 경로를 정의 */}
        {/* ":id"는 URL에서 영화 ID를 매개변수로 받을 수 있도록 설정 */}
        {/* 사용자가 "/details/:id"로 접속했을 때 `MovieDetail` 컴포넌트를 렌더링 */}
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="about" element={<div>About Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
