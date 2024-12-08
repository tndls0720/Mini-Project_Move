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

  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <h1>Movie Explorer</h1>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;