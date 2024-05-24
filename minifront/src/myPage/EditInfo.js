import React, { useState } from "react";
import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import AxiosApi from "../api/AxiosApi"; // 서버와 통신을 위한 API 모듈 임포트

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
  margin-bottom: 20px;
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

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const EditInfo = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await AxiosApi.updateUserInfo({ name, nickname, email });
      if (response.data) {
        setSuccessMessage("정보가 성공적으로 수정되었습니다.");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Logo src={imgLogo} />
      <Title>정보 수정</Title>
      <InputContainer>
        <InputTitle>이름</InputTitle>
        <Input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="이름을 입력하세요"
        />
        <InputTitle>닉네임</InputTitle>
        <Input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
        />
        <InputTitle>이메일</InputTitle>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
        />
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <Btn onClick={handleSubmit}>정보 수정</Btn>
    </Container>
  );
};

export default EditInfo;
