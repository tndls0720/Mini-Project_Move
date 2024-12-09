import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarContainer = styled.nav`
  background-color: #1c1c1c;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 5px;
  margin-right: 15px;
  background-color: #6a6b7c;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchInput = styled.input`
  width: 700px;
  height: 30px;
  margin-right: 70px;
  border-radius: 30px;
  padding: 5px 14px;
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <h1>MOVIE</h1>
      <NavLinks>
        <SearchInput type="text" placeholder="Search..." />
        <StyledLink to="/">로그인</StyledLink>
        <StyledLink to="/about">회원가입</StyledLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;
