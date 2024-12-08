import styled from "styled-components";
import { useParams } from "react-router-dom";
import movieListData from "../data/movieListData.json";

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
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 0.9rem;
  }
`;

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movieListData.results.find(
    (movie) => movie.id === parseInt(id)
  );
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <MovieDetailWrapper>
      <img src={posterUrl} alt={`${movie.title} Poster`} />
      <MovieInfo>
        <h1 className="title">{movie.title}</h1>
        <p className="vote">별점: {movie.vote_average}</p>
        <p className="overview">줄거리: {movie.overview}</p>
        <div className="movie-genres">
          {Array.isArray(movie.genres) && // genres가 배열인지 확인
            movie.genres.map((genre) => (
              <span key={genre.id} className="movie-genre">
                {genre.name}
              </span>
            ))}
        </div>
      </MovieInfo>
    </MovieDetailWrapper>
  );
};

export default MovieDetail;
