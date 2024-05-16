import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

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
  top: 1000px;
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  width: 100vw;
  height: 200px;
`;
const FooterContent = styled.p`
  margin: 20px auto auto 200px;
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 5%;
  right: 5%;
  justify-content: center;
  align-items: center;
`;

const ToggleBtn = styled.div`
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: black;
  color: white;
  border: 2px solid black;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 5%;
  right: 5%;
  display: ${(props) => props.display};
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: 200px;
  width: 200px;
  border-radius: 30px;
  background-color: white;
  border: 2px solid black;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease-in;
  z-index: 2;
`;

const BoxAnimation = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    rotateZ: 360,
    transition: {
      duration: 4,
      type: "spring",
      stiffness: 110,
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const BoxAnimation2 = {
  start: { scale: 1, opacity: 1 },
  end: {
    scale: 0,
    opacity: 0,
    rotateZ: 0,
    transition: {
      duration: 10,
      type: "spring",
      stiffness: 70,
    },
  },
};

const Inner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: black;
  color: white;
  border: 2px solid black;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in;
  }
`;

const InnerAnimation = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

const Home = () => {
  const [toggleDis, setToggleDis] = useState("none");
  const [toggleBtn, setToggleBtn] = useState("flex");
  const [boxKey, setBoxKey] = useState(0);
  const [start, setStart] = useState(null);

  const toggleClick = (status) => {
    if (status === 1) {
      setStart(1);
      setToggleBtn("none");
      setToggleDis("flex");
      setBoxKey((prevKey) => prevKey + 1);
    } else {
      setStart(null);
      setTimeout(() => {
        setToggleBtn("flex");
        setToggleDis("none");
      }, 350);
    }
  };

  return (
    <>
      <Container>
        <ToggleContainer>
          <ToggleBtn display={toggleBtn} onClick={() => toggleClick(1)}>
            Click
          </ToggleBtn>
          <Box
            key={boxKey}
            initial="start"
            animate="end"
            variants={start ? BoxAnimation : BoxAnimation2}
            display={toggleDis}
          >
            <Inner variants={InnerAnimation}>로그인</Inner>
            <Inner variants={InnerAnimation}>회원가입</Inner>
            <Inner variants={InnerAnimation} onClick={() => toggleClick(2)}>
              닫기
            </Inner>
          </Box>
        </ToggleContainer>
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
