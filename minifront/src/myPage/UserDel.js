import styled from "styled-components";
import imgLogo from "../images/cry.gif";
import { Link } from "react-router-dom";
import exit from "../images/exit.png";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import React, { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const Logo = styled.img`
  width: 200px;
  height: 150px;

  @media (max-width: 390px) {
    width: 100px;
    height: 100px;
  }
`;

const Container = styled.div`
  background-color: #acb3fd;
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  border-radius: 30px;
  @media (max-width: 430px) {
    height: 70vh;
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
  background-color: white;
  width: 220px;
  height: 70px;
  font-size: 24px;
  color: black;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.5s ease-in-out;
  position: relative;
  transform-style: preserve-3d;
  border: 3px solid #ebecff;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    border: 3px solid black;
  }
  @media (max-width: 430px) {
    margin-bottom: 20px;
    width: 180px;
    height: 50px;
  }
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.3s ease-in;
  }
  @media (max-width: 430px) {
    margin-top: 10px;
  }
`;

const UserDel = () => {
  const [isSuccess, setUserDel] = useState();
  // 삭제할 사용자의 ID를 설정 (로그인 정보나 context에서 가져올 수 있음)
  const id = localStorage.getItem("userId");

  const confirmDelete = async () => {
    console.log(id);
    if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
      try {
        const response = await AxiosApi.userDel(id);
        if (response.data) {
          setUserDel(true);
          localStorage.removeItem("userId");
          alert("회원 탈퇴가 성공적으로 완료되었습니다.");
        } else {
          setUserDel(false);
        }
      } catch (error) {
        console.log("회원 탈퇴를 실패했습니다: " + error.message);
        setUserDel(false);
      }
    }
  };

  useEffect(() => {
    if (isSuccess !== undefined) {
      if (isSuccess) window.location.href = "/askme";
      else alert("회원 탈퇴를 실패했습니다.");
    }
  }, [isSuccess]);

  return (
    <>
      <Container>
        <Toggle />

        <Body>
          <Logo src={imgLogo} />
          <Btn onClick={confirmDelete}>회원 탈퇴</Btn>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </Body>
      </Container>
      <Footer />
    </>
  );
};

export default UserDel;
