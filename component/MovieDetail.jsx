import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MovieDetailWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const MovieInfo = styled.div`
  flex: 1;
  text-align: left;

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .vote {
    color: #f39c12;
    font-size: 1.2rem;
  }

  .overview {
    margin-top: 20px;
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }

  .genre {
    display: inline-block;
    background-color: #65809d;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 0.9rem;
  }
`;

// TMDb API 정보
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID 추출
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&language=ko-KR`
        );
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovieDetail();
  }, []);

  // 로딩 상태 처리
  // if (!movie) {
  //   return <div>Loading...</div>;
  // }

  return (
    <MovieDetailWrapper>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={`${movie?.title} Poster`}
      />
      <MovieInfo>
        <h1 className="title">{movie?.title}</h1>
        <p className="vote">⭐ {movie?.vote_average}</p>
        <div className="movie-genres">
          {movie?.genre_ids?.map((genre) => (
            <span key={genre.id} className="genre">
              {genre.name}
            </span>
          ))}
        </div>
        <p className="overview">{movie?.overview}</p>
      </MovieInfo>
    </MovieDetailWrapper>
  );
};

export default MovieDetail;
