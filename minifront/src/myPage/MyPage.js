import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import exit from "../images/exit.png";
import AxiosApi from "../api/AxiosApi";
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Change to space-between */
  align-items: center;
  margin: 0 auto;
  @media (max-width: 430px) {
    height: auto;
  }
`;

const Body = styled.div`
  width: 100%; /* Change to 100% to take full width */
  flex: 1; /* Add flex-grow to take available space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.div`
  background-color: black;
  width: 220px;
  height: 60px;
  font-size: 24px;
  color: white;
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
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

const FoundIdMessage = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #262626;
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: #f0f0f0;
  span {
    color: #d147e5;
  }
`;

const MyPage = () => {
  const [isIdFound, setIsIdFound] = useState(false);
  const [roomNum, setroomNum] = useState("");
  const [roomid, setRoomid] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  }, []);

  const handleButtonClick = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await AxiosApi.getRoomId(userId);
      setroomNum(response.data);
      setIsIdFound(true);
    } catch (error) {
      console.error(error);
    }
  };

  const editExit = useNavigate();
  const exitClick = () => {
    setIsIdFound(false);
    editExit("/askme");
  };

  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          {isIdFound ? (
            <FoundIdMessage>
              나의 채팅방 번호 : <span>{roomNum}</span>
            </FoundIdMessage>
          ) : (
            <ButtonContainer>
              <Link to="/askme/mypage/confirm">
                <Btn>정보 수정</Btn>
              </Link>
              <Btn onClick={handleButtonClick}>나의 채팅방</Btn>
              <Link to="/askme/userdel">
                <Btn>회원 탈퇴</Btn>
              </Link>
            </ButtonContainer>
          )}
          <Exit onClick={exitClick} src={exit} />
        </Body>
        <Footer />
      </Container>
    </>
  );
};

export default MyPage;
