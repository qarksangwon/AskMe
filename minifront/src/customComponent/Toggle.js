import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 5%;
  right: 5%;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media (max-width: 430px) {
    width: 104px;
    height: 104px;
  }
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
  @media (max-width: 430px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
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
  @media (max-width: 430px) {
    width: 100px;
    height: 100px;
  }
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
  @media (max-width: 430px) {
    width: 40px;
    height: 40px;
    font-size: 11px;
  }
`;

const InnerAnimation = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

const Toggle = () => {
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
        <Link to="/askme/signup">
          <Inner variants={InnerAnimation}>회원가입</Inner>
        </Link>
        <Inner variants={InnerAnimation} onClick={() => toggleClick(2)}>
          닫기
        </Inner>
      </Box>
    </ToggleContainer>
  );
};

export default Toggle;