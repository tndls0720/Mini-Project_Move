import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";
import styled from "styled-components";

// The Movie Database API의 기본 URL과 API 키 가져오기
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Layout 컴포넌트 정의: 검색 및 영화 결과 렌더링
const Layout = () => {
  // 검색 결과를 저장하는 상태
  const [searchResults, setSearchResults] = useState([]);

  // 검색 중인지 여부를 저장하는 로딩 상태
  const [loading, setLoading] = useState(false);

  // 검색어를 기반으로 영화 데이터를 가져오는 함수
  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      // 검색어가 비어 있을 경우, 결과를 초기화
      setSearchResults([]);
      return;
    }

    setLoading(true); // 로딩 상태 활성화

    try {
      // API 요청 보내기: 검색어, 언어를 포함한 URL
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}`
      );

      // JSON 응답 데이터로 변환
      const data = await response.json();

      // 검색 결과 상태 업데이트
      setSearchResults(data.results || []);
    } catch (error) {
      // API 요청 중 오류 처리
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  }, []);

  return (
    <>
      {/* NavBar 컴포넌트에 검색 함수 전달 */}
      <NavBar onSearch={handleSearch} />

      {/* 메인 컨테이너 */}
      <MainContainer>
        {loading ? (
          // 로딩 중일 때 표시
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          // 검색 결과가 있을 때, MovieCard 컴포넌트 렌더링
          <MovieGrid>
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id} // 고유 ID로 컴포넌트 식별
                id={movie.id} // 영화 ID 전달
                title={movie.title} // 영화 제목 전달
                poster_path={movie.poster_path} // 영화 포스터 이미지 경로 전달
                vote_average={movie.vote_average} // 영화 평점 전달
              />
            ))}
          </MovieGrid>
        ) : (
          // 검색 결과가 없을 때, 검색 결과 상태를 출력
          searchResults
        )}

        {/* Outlet을 통해 중첩 라우트를 렌더링 (예: 상세 페이지) */}
        <Outlet />
      </MainContainer>
    </>
  );
};

export default Layout;

// 스타일드 컴포넌트 정의 (CSS

const MainContainer = styled.main`
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;
