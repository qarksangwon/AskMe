import styled from "styled-components";
import imgLogo from "../images/Logotest.gif";
import { Link } from "react-router-dom";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import boardMain from "../images/boardMain.png";
import chatMain from "../images/chatMain.png";

const LogoContainer = styled.div`
  width: auto;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 431px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  @media (max-width: 431px) {
    width: 240px;
    height: auto;
    margin-bottom: 30px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ebecff;
`;

const BodyContent = styled.div`
  width: 80vw;
  height: 80vh;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #acb3fd;
  @media (max-width: 431px) {
    flex-direction: column;
  }
`;

const Body2 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Body2Content = styled.div`
  width: 80vw;
  height: 80vh;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #ebecff;
  @media (max-width: 431px) {
    flex-direction: column-reverse;
  }
`;

const Body2Img = styled.img`
  width: 400px;
  height: auto;
  @media (max-width: 431px) {
    width: 300px;
  }
`;

const BoardBtn = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #acb3fd;
  background-color: #acb3fd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: white;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    color: #acb3fd;
    background-color: white;
  }
  @media (max-width: 431px) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`;

const Body3 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ebecff;
`;

const Body3Img = styled.img`
  width: 360px;
  height: auto;
  @media (max-width: 431px) {
    width: 300px;
  }
`;

const ChatBtn = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #ebecff;
  background-color: #ebecff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #acb3fd;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    color: white;
    border: 2px solid white;
    background-color: #acb3fd;
  }
  @media (max-width: 431px) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`;

const ContentTitle = styled.p`
  font-size: 60px;
  @media (max-width: 431px) {
    font-size: 30px;
  }
`;

const Content = styled.p`
  font-size: 40px;
  @media (max-width: 431px) {
    font-size: 20px;
  }
`;

const Home = () => {
  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <BodyContent>
            <LogoContainer>
              <Logo src={imgLogo} />
              <TextContainer>
                <ContentTitle style={{ color: "white" }}>ASK ME</ContentTitle>
                <br />
                <Content style={{ color: "white" }}>실시간</Content>
                <br />
                <Content style={{ color: "white" }}>채팅서비스</Content>
              </TextContainer>
            </LogoContainer>
          </BodyContent>
        </Body>
        <Body2>
          <Body2Content>
            <TextContainer>
              <Content style={{ color: "#acb3fd" }}>지식을 공유하세요 </Content>
              <Link to="/askme/board">
                <BoardBtn>게시판 이동하기</BoardBtn>
              </Link>
            </TextContainer>
            <Body2Img src={boardMain} />
          </Body2Content>
        </Body2>
        <Body3>
          <BodyContent>
            <Body3Img src={chatMain} />
            <TextContainer>
              <Content style={{ color: "white" }}>실시간으로</Content>
              <br />
              <Content style={{ color: "white" }}>정보를 교환하세요</Content>
              <ChatBtn>채팅방 이동하기</ChatBtn>
            </TextContainer>
          </BodyContent>
        </Body3>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
