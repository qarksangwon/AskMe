import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { Link } from "react-router-dom";
import exit from "../images/exit.png";

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

const Logo = styled.img`
  width: 150px;
  height: 150px;
  @media (max-width: 390px) {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 20px 0;
`;

const InputContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @media (max-width: 430px) {
    width: 80vw;
  }
`;

const InputTitle = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #e2e0e0;
  font-size: 16px;
`;

const Btn = styled.button`
  background-color: black;
  width: 220px;
  height: 50px;
  font-size: 20px;
  color: white;
  margin: 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.5s ease-in-out;
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
    width: 180px;
    height: 50px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
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

const PasswordConfirm = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Current userId:", userId); // 현재 userId 확인
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log("Password:", e.target.value); // 입력한 비밀번호를 콘솔에 출력
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    console.log("Sending to server:", { userId, password });

    try {
      const response = await AxiosApi.verifyPassword(userId, password); // 서버에 비밀번호 확인 요청
      console.log("Server response:", response.data);

      if (response.data) {
        navigate("/askme/mypage/edit-info"); // 비밀번호가 일치하면 정보 수정 페이지로 이동
      } else {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [password]); // password가 변경될 때마다 효과를 재실행

  return (
    <Container>
      <Logo src={imgLogo} />
      <Title>비밀번호 확인</Title>
      <InputContainer>
        <InputTitle>비밀번호</InputTitle>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
        />
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Btn onClick={handleSubmit}>비밀번호 확인</Btn>
      <Link to="/askme/mypage">
        <Exit src={exit} />
      </Link>
    </Container>
  );
};

export default PasswordConfirm;
