import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../component/MovieCard";

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const MovieListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&language=ko-KR`
        );
        const data = await response.json();
        const filteredMovies = data.results.filter((movie) => !movie.adult);
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Wrapper>
      <Title>Popular Movies</Title>
      <MovieListWrapper>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </MovieListWrapper>
    </Wrapper>
  );
};

export default MovieList;
