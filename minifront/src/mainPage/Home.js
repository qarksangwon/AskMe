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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10vw auto auto auto;
`;

const Btn = styled.div`
  background-color: black;
  width: 200px;
  height: 40px;
  color: white;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.4s ease-in-out;
  position: relative;
  transform-style: preserve-3d;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
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

const Home = () => {
  return (
    <Container>
      <Logo src={imgLogo} />
      <div>
        <Link to="/board">
          <Btn>
            <BtnFront>게시판</BtnFront>
            <BtnBack>이동하기</BtnBack>
          </Btn>
        </Link>
        <Btn>
          <BtnFront>채팅방</BtnFront>
          <BtnBack>이동하기</BtnBack>
        </Btn>
      </div>
    </Container>
  );
};

export default Home;
