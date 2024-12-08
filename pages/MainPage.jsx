import { useState } from "react";
import MovieCard from "../component/MovieCard";
import movieListData from "../data/movieListData.json";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MovieListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 가운데 정렬 */
  gap: 20px; /* 카드 간 간격 */
  padding: 20px;
`;

const MainPageContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const MainPageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;
function MainPage() {
  const [results] = useState(movieListData.results);
  // console.log(results);

  return (
    <MainPageContainer>
      <MainPageTitle>Movie</MainPageTitle>
      <MovieListWrapper>
        {results.map((movie) => (
          <Link
            key={movie.id}
            to={`/details/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <MovieCard
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          </Link>
        ))}
      </MovieListWrapper>
    </MainPageContainer>
  );
}

export default MainPage;
