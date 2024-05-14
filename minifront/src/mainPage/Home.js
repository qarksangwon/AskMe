import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link } from "react-router-dom";

const Logo = styled.img`
  width: 150px;
  height: 150px;
  @media (max-width: 390px) {
    width: 50px;
    height: 50px;
  }
`;

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Body = styled.div`
  position: absolute;
  top: -40px;
  width: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.div`
  background-color: black;
  width: 280px;
  height: 80px;
  font-size: 24px;
  color: white;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.4s ease-in-out;
  position: relative;
  transform-style: preserve-3d;
  border: 3px solid black;

  &:hover {
    background-color: white;
    color: black;
    transform: rotateY(180deg);
    transition: all 0.4s ease-in-out;
  }
  &:active {
    background-color: #aaaaaa;
    color: white;
    transition: all 0.1s ease-in;
  }
`;

const BtnFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  pointer-events: none;
`;

const Footer = styled.div`
  position: absolute;
  top: 718px;
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100vw;
  height: 200px;
`;
const FooterContent = styled.p`
  margin: 20px auto auto 200px;
`;
const Home = () => {
  return (
    <>
      <Container>
        <Body>
          <Logo src={imgLogo} />
          <Link to="/board">
            <Btn>
              <BtnFront>게시판</BtnFront>
              <BtnBack>이동하기</BtnBack>
            </Btn>
          </Link>
          <Link to="/">
            <Btn>
              <BtnFront>채팅방</BtnFront>
              <BtnBack>이동하기</BtnBack>
            </Btn>
          </Link>
        </Body>
        <Footer>
          <FooterContent>이용 약관 | 개인정보 취급 방침</FooterContent>
          <FooterContent>(주) 곰돌이사먹자</FooterContent>
          <FooterContent>찾아오는 길 : 알아서 잘 오소</FooterContent>
          <FooterContent>tel : 112</FooterContent>
        </Footer>
      </Container>
    </>
  );
};

export default Home;
