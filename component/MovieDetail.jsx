import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 영화 상세 페이지의 전체 레이아웃 스타일 정의
const MovieDetailWrapper = styled.div`
  display: flex; /* 컨테이너 내부 요소를 가로로 배치 */
  gap: 20px; /* 요소 간 간격 */
  padding: 20px; /* 내부 여백 */
  max-width: 1200px; /* 컨테이너의 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */

  img {
    width: 100%; /* 이미지가 컨테이너 너비를 가득 채움 */
    max-width: 400px; /* 이미지의 최대 너비 */
    border-radius: 10px; /* 이미지 모서리를 둥글게 처리 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  }
`;

// 영화 정보 영역 스타일 정의
const MovieInfo = styled.div`
  flex: 1; /* 남은 공간을 모두 차지 */
  text-align: left; /* 텍스트를 왼쪽 정렬 */

  .title {
    font-size: 2.5rem; /* 제목의 글꼴 크기 */
    font-weight: bold; /* 제목을 굵게 표시 */
    margin-bottom: 10px; /* 제목과 다음 요소 사이의 간격 */
  }

  .vote {
    color: #f39c12; /* 별점의 색상을 노란색 계열로 설정 */
    font-size: 1.2rem; /* 별점의 글꼴 크기 */
  }

  .overview {
    margin-top: 20px; /* 줄거리와 위 요소 사이의 간격 */
    font-size: 1rem; /* 줄거리의 글꼴 크기 */
    line-height: 1.6; /* 줄 간격 설정 */
    color: #555; /* 텍스트 색상을 회색 계열로 설정 */
  }

  .genre {
    display: inline-block; /* 장르를 인라인 블록으로 설정 */
    background-color: #65809d; /* 장르 배경색 설정 */
    color: white; /* 장르 텍스트 색상을 흰색으로 설정 */
    padding: 5px 10px; /* 내부 여백 추가 */
    border-radius: 5px; /* 장르 박스의 모서리를 둥글게 처리 */
    margin-right: 5px; /* 장르 간 간격 */
    font-size: 0.9rem; /* 장르 텍스트의 글꼴 크기 */
  }
`;

// TMDb API의 기본 URL과 API 키
const API_BASE_URL = "https://api.themoviedb.org/3"; // TMDb API의 기본 경로
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경 변수에서 API 키를 가져옴

// `MovieDetail` 컴포넌트 정의
const MovieDetail = () => {
  // URL의 동적 파라미터 `id`를 추출 (React Router 기능)
  const { id } = useParams(); 

  // 영화 데이터를 저장할 상태 선언 (초기값은 빈 배열로 설정)
  const [movie, setMovie] = useState([]);

  // `useEffect`를 사용해 컴포넌트가 마운트될 때 영화 데이터를 가져옴 (비동기 함수)
  useEffect(() => {
    // 비동기로 TMDb API를 호출하여 영화 상세 데이터를 가져오는 함수
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR` // API 호출 URL
        );
        const data = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
        setMovie(data); // 파싱된 데이터를 상태에 저장
        console.log(data); // 콘솔에 응답 데이터 출력 (디버깅용)
      } catch (error) { // API 호출 실패할 경우
        console.error("Error fetching movies:", error); // 에러가 발생하면 콘솔에 출력
      }
    };

    fetchMovieDetail(); // 영화 데이터를 가져오는 함수 실행
  }, []); // 의존성 빈 배열: 컴포넌트가 처음 렌더링될 때만 실행

  // `movie` 상태를 기반으로 화면에 영화 상세 정보를 렌더링
  return (
    <MovieDetailWrapper>
      {/* 영화 포스터 이미지를 표시 */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} // 포스터 URL
        alt={`${movie?.title} Poster`} // 포스터에 대한 대체 텍스트
      />
      {/* 영화 정보 표시 영역 */}
      <MovieInfo>
        <h1 className="title">{movie?.title}</h1> {/* 영화 제목 */}
        <p className="vote">⭐ {movie?.vote_average}</p> {/* 영화 평점 */}
        <div className="movie-genres">
          {/* 장르를 순회하여 각각의 장르 이름을 표시 */}
          {movie?.genres?.map((genre) => (
            <span key={genre.id} className="genre">
              {genre.name}
            </span>
          ))}
        </div>
        <p className="overview">{movie?.overview}</p> {/* 영화 줄거리 */}
      </MovieInfo>
    </MovieDetailWrapper>
  );
};

export default MovieDetail;
