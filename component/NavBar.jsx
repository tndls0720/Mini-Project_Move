import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDebounce from "./useDebounce";

const NavBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const devounceSearchText = useDebounce(searchText, 5000);

  useEffect(() => {
    if (devounceSearchText.trim()) {
      onSearch(devounceSearchText);
    }
  }, [devounceSearchText, onSearch]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <NavBarContainer>
      {/* 헤더 제목에 Link 추가 */}
      <StyledTitle to="/">MOVIE</StyledTitle>
      <NavLinks>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleChange}
        />
        <StyledLink to="/">로그인</StyledLink>
        <StyledLink to="/about">회원가입</StyledLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;

// 스타일 컴포넌트
const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
`;

const StyledTitle = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: #ffcc00;
  text-decoration: none;
  transition: transform 0.2s, color 0.2s;

  &:hover {
    color: #ffffff;
    transform: scale(1.1); /* 크기 확대 */
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #ffcc00;
    color: #333;
  }
`;
