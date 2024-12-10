import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieCardWrapper = styled.div`
  width: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 2px solid #f4f4f4;
`;

const MovieTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 10px 0;
`;

const MovieAverage = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 15px;
`;

const MovieCard = ({ id, title, poster_path, vote_average }) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;

  return (
    <MovieCardWrapper onClick={() => navigate(`/details/${id}`)}>
      <MoviePoster src={posterUrl} alt={`${title} poster`} />
      <MovieTitle>{title}</MovieTitle>
      <MovieAverage>⭐ {vote_average}</MovieAverage>
    </MovieCardWrapper>
  );
};

export default MovieCard;
