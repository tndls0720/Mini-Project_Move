import styled from "styled-components";
// import { useParams } from "react-router-dom";
// import movieListData from "../data/movieListData.json";
import movieDetailData from "../data/movieDetailData.json";
import { useState } from "react";

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

const MovieDetail = () => {
  const [movieDetail] = useState(movieDetailData);
  //   // URL에서 동적 파라미터(id)를 추출하기 위해 useParams를 사용
  //   const { id } = useParams();

  // 영화 장르 데이터를 매핑하기 위한 객체 생성
  // movieDetailData.genres 배열의 각 장르 정보를 순회하며 id를 키로, name을 값으로 갖는 객체 생성
  // const genreMapping = movieDetailData.genres.reduce((acc, genre) => {
  //   acc[genre.id] = genre.name;
  //   return acc;
  // }, {});
  // console.log(genreMapping);

  // const movie = movieDetailData.genres.find(
  //   (movie) => movie.id === parseInt(id)
  // );

  // if (!movie || !movie.genre_ids) {
  //   return <div>Loading...</div>;
  // }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`;

  return (
    <MovieDetailWrapper>
      <img src={posterUrl} alt={`${movieDetail.title} Poster`} />
      <MovieInfo>
        <h1 className="title">{movieDetail.title}</h1>
        <p className="vote">별점: {movieDetail.vote_average}</p>
        <div className="movie-genres">
          {movieDetail.genres.map((genre) => genre.name)}
        </div>
        <p className="overview">줄거리: {movieDetail.overview}</p>
      </MovieInfo>
    </MovieDetailWrapper>
  );
};

export default MovieDetail;
