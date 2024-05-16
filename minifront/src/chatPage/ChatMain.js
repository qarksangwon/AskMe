import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import exit from "../images/exit.png";
import { Link } from "react-router-dom";

const Logo = styled.img`
  width: 150px;
  height: 150px;
  @media (max-width: 430px) {
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
  top: -40px;
  width: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  @media (max-width: 430px) {
    width: 400px;
    height: 400px;
  }
`;

const Btn = styled.div`
  width: 140px;
  height: 160px;
  margin: 0px auto;
  background-color: black;
  color: white;
  border: 3px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 430px) {
    width: 100px;
    height: 120px;
    font-size: 16px;
  }
`;
const Exit = styled.img`
  width: 70px; /* 아이콘의 크기를 적절히 조절합니다 */
  height: 70px;
  cursor: pointer; /* 아이콘에 커서 포인터 추가 */
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const ChatMain = () => {
  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          <BtnContainer>
            <Btn>채팅방 만들기</Btn>
            <Btn>채팅방 삭제하기</Btn>
            <Btn>채팅방 입장하기</Btn>
          </BtnContainer>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </Body>
        <Footer top={900} mtop={732} />
      </Container>
    </>
  );
};

export default ChatMain;
