import styled from "styled-components";
import imgLogo from "../images/Logotest.gif";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import boardMain from "../images/boardMain.png";
import chatMain from "../images/chatMain.png";
import { useEffect, useRef, useState } from "react";

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
const Dot = ({ num, currentPage }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: "1px solid black",
        borderRadius: 999,
        backgroundColor: currentPage === num ? "black" : "transparent",
        transitionDuration: 1000,
        transition: "background-color 0.5s",
      }}
    ></div>
  );
};

const Dots = ({ currentPage }) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} currentPage={currentPage}></Dot>
        <Dot num={2} currentPage={currentPage}></Dot>
        <Dot num={3} currentPage={currentPage}></Dot>
      </div>
    </div>
  );
};

const Outer = styled.div`
  height: 100vh;
  overflow-y: hidden; /* 스크롤바를 숨깁니다 */
  ::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바를 숨깁니다 */
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  /** 스크롤 동작 */
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  /** 채팅방 이동  */
  const onClickChat = () => {
    const isLogin = localStorage.getItem("userId");
    if (isLogin !== "" || isLogin.length > 2) {
      navigate("/askme/chatmain");
    } else {
      alert("로그인이 필요한 페이지 입니다.");
    }
  };

  return (
    <>
      <Toggle />

      <Dots currentPage={currentPage} />
      <Outer ref={outerDivRef}>
        <Container>
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
        </Container>
        <Container>
          <Body2>
            <Body2Content>
              <TextContainer>
                <Content style={{ color: "#acb3fd" }}>질문하고 </Content>
                <br />
                <Content style={{ color: "#acb3fd" }}>답을 구해보세요 </Content>
                <Link to="/askme/board">
                  <BoardBtn>게시판 이동하기</BoardBtn>
                </Link>
              </TextContainer>
              <Body2Img src={boardMain} />
            </Body2Content>
          </Body2>
        </Container>
        <Container>
          <Body3>
            <BodyContent>
              <Body3Img src={chatMain} />
              <TextContainer>
                <Content style={{ color: "white" }}>실시간으로</Content>
                <br />
                <Content style={{ color: "white" }}>정보를 교환하세요</Content>
                <ChatBtn onClick={onClickChat}>채팅방 이동하기</ChatBtn>
              </TextContainer>
            </BodyContent>
          </Body3>
        </Container>
      </Outer>
    </>
  );
};

export default Home;
