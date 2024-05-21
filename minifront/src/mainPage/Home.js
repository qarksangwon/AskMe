import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link } from "react-router-dom";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";

const Logo = styled.img`
  width: 150px;
  height: 150px;
  @media (max-width: 390px) {
    width: 100px;
    height: 100px;
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
  height: 160px;
  font-size: 24px;
  color: white;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.5s ease-in-out;
  position: relative;
  transform-style: preserve-3d;
  border: 3px solid black;

  &:hover {
    background-color: white;
    color: black;
    transform: rotateY(180deg);
    transition: all 0.5s ease-in-out;
  }
  &:active {
    background-color: #aaaaaa;
    color: white;
    transition: all 0.1s ease-in;
  }
  @media (max-width: 430px) {
    width: 160px;
    height: 60px;
    font-size: 20px;
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

const Home = () => {
  const id = localStorage.getItem("userId");
  const test = () => {
    console.log(id);
  };
  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          <Link to="/askme/board">
            <Btn>
              <BtnFront>게시판</BtnFront>
              <BtnBack>이동하기</BtnBack>
            </Btn>
          </Link>
          <Link to="/askme/chatmain">
            <Btn>
              <BtnFront>채팅방</BtnFront>
              <BtnBack>이동하기</BtnBack>
            </Btn>
          </Link>
          <button onClick={test}>123</button>
        </Body>
        <Footer top={1000} mtop={732} />
      </Container>
    </>
  );
};

export default Home;
