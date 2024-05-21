import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link } from "react-router-dom";
import exit from "../images/exit.png";
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
  @media (max-width: 430px) {
    height: 90vh;
  }
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
  width: 220px;
  height: 70px;
  font-size: 24px;
  color: white;
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.5s ease-in-out;
  position: relative;
  transform-style: preserve-3d;
  border: 3px solid black;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    border: 2px solid black;
  }
  @media (max-width: 430px) {
    margin-bottom: 20px;
    width: 180px;
    height: 50px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 430px) {
    margin-top: 10px;
  }
`;

const MyPage = () => {
  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          <ButtonContainer>
            <Link to="/askme">
              <Btn>
                <BtnFront>정보 수정</BtnFront>
                <BtnBack>이동하기</BtnBack>
              </Btn>
            </Link>
            <Link to="/askme">
              <Btn>
                <BtnFront>내가 쓴 글</BtnFront>
                <BtnBack>이동하기</BtnBack>
              </Btn>
            </Link>
            <Link to="/askme">
              <Btn>
                <BtnFront>채팅방 목록</BtnFront>
                <BtnBack>이동하기</BtnBack>
              </Btn>
            </Link>
            <Link to="/askme">
              <Btn>
                <BtnFront>회원 탈퇴</BtnFront>
                <BtnBack>이동하기</BtnBack>
              </Btn>
            </Link>
          </ButtonContainer>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </Body>
        <Footer top={1000} mtop={732} />
      </Container>
    </>
  );
};

export default MyPage;
