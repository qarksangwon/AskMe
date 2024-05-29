import styled from "styled-components";
import imgLogo from "../images/Logotest.gif";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import exit from "../images/exit.png";
import AxiosApi from "../api/AxiosApi";
import Footer from "../customComponent/Footer";
import Toggle from "../customComponent/Toggle";

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 30px;
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
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  @media (max-width: 431px) {
    width: 400px;
    flex-direction: column;
  }
`;

const Btn = styled.div`
  width: 220px;
  height: 60px;
  margin: 10px;
  background-color: #acb3fd;
  color: white;
  border: 3px solid #acb3fd;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: white;
    color: #acb3fd;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 431px) {
    width: 180px;
    height: 50px;
  }
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
`;

const Admin = () => {
  const navigate = useNavigate();

  const exitClick = () => {
    navigate("/askme");
  };

  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          <BtnContainer>
            <Link to="/askme/admin/userlist">
              <Btn>회원 관리</Btn>
            </Link>
            <Link to="/askme/admin/boardlist">
              <Btn>게시판 목록</Btn>
            </Link>
            <Link to="/askme/admin/chatroomlist">
              <Btn>채팅방 목록</Btn>
            </Link>
          </BtnContainer>
          <Exit onClick={exitClick} src={exit} />
        </Body>
        <Footer />
      </Container>
    </>
  );
};

export default Admin;
