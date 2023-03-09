import * as React from "react";
import { Outlet } from "react-router-dom";
import { LoginButton } from "../components";
import {
  ContentContainer,
  FlexWrapper,
  Header,
  Logo,
  StyledLink,
} from "./MainLayout.styles";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export const MainLayout: React.FC = (props) => {
  const { userId } = useContext(UserContext);
  return (
    <>
      <Header>
        <ContentContainer>
          <FlexWrapper>
            <Logo />
            <LoginButton />
          </FlexWrapper>
          <ul>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/London">London</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Paris">Paris</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Berlin">Berlin</StyledLink>
            </li>
            {userId && <li>
              <StyledLink to="/favourite">Favourite sale</StyledLink>
            </li>}
          </ul>
        </ContentContainer>
      </Header>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};
