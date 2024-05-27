import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../api/Fb";
import profileLogo from "../images/profileLogo.png";

const ToggleContainer = styled.div`
  display: flex;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: fixed;
  top: ${(props) => props.coordinate}%;
  right: ${(props) => props.coordinate}%;
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
  background-color: white;
  color: #8187be;
  border: 2px solid #d6d9fe;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #d6d9fe;
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
  border: 2px solid #d6d9fe;
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
      delayChildren: 0.5,
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
  background-color: #d6d9fe;
  color: #8187be;
  border: 2px solid #d6d9fe;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in;
  }
  @media (max-width: 430px) {
    width: 40px;
    height: 40px;
    font-size: 8px;
  }
`;

const InnerAnimation = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #d6d9fe;
  border-radius: 100%;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Toggle = () => {
  const [containerSize, setContainerSize] = useState(70);
  const [coordinate, setCoordinate] = useState(12);
  const [toggleDis, setToggleDis] = useState("none");
  const [toggleBtn, setToggleBtn] = useState("flex");
  const [boxKey, setBoxKey] = useState(0);
  const [start, setStart] = useState(null);
  const [userNickname, setUserNickname] = useState("");
  const [imageUrl, setImageUrl] = useState(profileLogo);
  const [visible, setVisible] = useState(false);
  const [firstIn, SetFirstIn] = useState(true);

  useEffect(() => {
    setUserNickname(localStorage.getItem("userId"));
  }, []);

  const toggleClick = (status) => {
    if (status === 1) {
      setStart(1);
      setContainerSize(200);
      setCoordinate(4);
      setToggleBtn("none");
      setToggleDis("flex");
      setVisible(false);
      setBoxKey((prevKey) => prevKey + 1);
    } else {
      setStart(null);
      setTimeout(() => {
        setContainerSize(70);
        setCoordinate(12);
        setToggleBtn("flex");
        setVisible(true);
        setToggleDis("none");
      }, 350);
    }
  };

  useEffect(() => {
    if (userNickname) {
      const imageRef = ref(storage, `images/${userNickname}`);
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
          SetFirstIn(false);
          setTimeout(() => {
            setVisible(true); // 1초 후에 visible 상태를 true로 변경
          }, 700);
        })
        .catch((error) => {
          console.error("이미지 다운로드 URL 가져오기 실패:", error);
          setVisible(true);
          SetFirstIn(false);
        });
    }
  }, [userNickname]);

  return (
    <ToggleContainer size={containerSize} coordinate={coordinate}>
      {firstIn ? (
        <ToggleBtn display={toggleBtn} onClick={() => toggleClick(1)}>
          Click
        </ToggleBtn>
      ) : (
        <ProfileImage
          display={toggleBtn}
          src={imageUrl}
          filename={userNickname}
          onClick={() => toggleClick(1)}
          visible={visible}
        />
      )}
      <Box
        key={boxKey}
        initial="start"
        animate="end"
        variants={start ? BoxAnimation : BoxAnimation2}
        display={toggleDis}
      >
        {firstIn ? (
          <>
            <Link to="/askme/login">
              <Inner variants={InnerAnimation}>로그인</Inner>
            </Link>

            <Link to="/askme/signup">
              <Inner variants={InnerAnimation}>회원가입</Inner>
            </Link>
            <Link to="/askme/login">
              <Inner variants={InnerAnimation}>ID/PW찾기</Inner>
            </Link>
            <Inner variants={InnerAnimation} onClick={() => toggleClick(2)}>
              닫기
            </Inner>
          </>
        ) : (
          <>
            <Link to="/askme/mypage">
              <Inner variants={InnerAnimation}>
                마이
                <br />
                페이지
              </Inner>
            </Link>
            <Inner
              variants={InnerAnimation}
              onClick={() => {
                setUserNickname("");
                localStorage.setItem("userId", "");
                localStorage.setItem("userNickname", "");
                window.location.reload();
              }}
            >
              로그아웃
            </Inner>
            <Inner variants={InnerAnimation} onClick={() => toggleClick(2)}>
              닫기
            </Inner>
          </>
        )}
      </Box>
    </ToggleContainer>
  );
};

export default Toggle;
