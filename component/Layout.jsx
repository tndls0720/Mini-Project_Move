import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieCard from "../component/MovieCard";
import NavBar from "../component/NavBar";

// 메인 컨테이너 스타일 설정
const MainContainer = styled.main`
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

// 영화 카드들을 그리드 형태로 배치하기 위한 스타일 설정
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// TMDB API의 기본 URL과 API 키 설정
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경 변수에서 API 키 가져오기

const MovieList = () => {
  // 상태 관리: 영화 리스트와 검색 결과, 로딩 상태
  const [movies, setMovies] = useState([]); // 인기 영화 목록 저장
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const navigate = useNavigate(); // React Router의 내비게이션 훅

  // 초기 렌더링 시, 인기 영화 목록 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // 로딩 상태 활성화
        const response = await fetch(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        const data = await response.json();
        setMovies(data.results.filter((movie) => !movie.adult)); // 성인 영화 제외
      } catch (error) {
        console.error("Error fetching movies:", error); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 비활성화
      }
    };

    fetchMovies(); // API 호출 함수 실행
  }, []);

  // 검색 처리 함수: 사용자가 검색어를 입력하면 호출됨
  const handleSearch = useCallback(
    async (searchTerm) => {
      if (!searchTerm) {
        // 검색어가 없으면 검색 결과 초기화
        setSearchResults([]);
        return;
      }

      setLoading(true); // 로딩 상태 활성화
      try {
        const response = await fetch(
          `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data.results); // 검색 결과를 상태에 저장

        // 검색 결과가 하나일 경우, 해당 영화의 상세 페이지로 이동
        if (data.results?.length === 1) {
          navigate(`/details/${data.results[0].id}`); // 상세 페이지 경로로 이동
        }
      } catch (error) {
        console.error("Error fetching search results:", error); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 비활성화
      }
    },
    [navigate]
  );

  // 영화 카드 클릭 시 호출: 영화 ID를 기반으로 상세 페이지로 이동
  const handleCardClick = (id) => {
    navigate(`/details/${id}`); // React Router를 통해 상세 페이지 경로로 이동
  };

  return (
    <>
      {/* 네비게이션 바 컴포넌트 */}
      <NavBar onSearch={handleSearch} />{" "}
      {/* 검색어 입력 시 handleSearch 호출 */}
      <MainContainer>
        {loading ? (
          // 로딩 상태일 경우 표시되는 메시지
          <p>Loading...</p>
        ) : (
          // 영화 그리드 렌더링
          <MovieGrid>
            {/* 검색 결과가 있을 경우 검색 결과를, 그렇지 않으면 인기 영화를 보여줌 */}
            {(searchResults.length > 0 ? searchResults : movies).map(
              (movie) => (
                <MovieCard
                  key={movie.id} // 영화 ID를 키로 사용
                  id={movie.id} // 영화 ID
                  title={movie.title} // 영화 제목
                  poster_path={movie.poster_path} // 영화 포스터 경로
                  vote_average={movie.vote_average} // 영화 평점
                  onClick={() => handleCardClick(movie.id)} // 카드 클릭 시 handleCardClick 호출
                />
              )
            )}
          </MovieGrid>
        )}
      </MainContainer>
    </>
  );
};

export default MovieList;
