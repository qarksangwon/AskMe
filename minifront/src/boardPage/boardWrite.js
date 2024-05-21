import styled from "styled-components";
import Toggle from "../customComponent/Toggle";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import Footer from "../customComponent/Footer";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 10vh auto auto auto;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 110px;
  border-bottom: 3px solid black;
  font-size: 40px;
  margin-bottom: 0px;

  @media (max-width: 430px) {
    width: 100px;
    font-size: 30px;
  }
`;

const TitleName = styled.input.attrs({ type: "text" })`
  display: flex;
  width: 600px;
  height: 100px;
  border-radius: 30px;
  border: 1px solid #ececec;
  padding: 20px;
  background-color: #ececec;
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 30px;

  font-family: "DoHyeon-Regular", sans-serif;

  @media (max-width: 430px) {
    display: flex;
    width: 350px;
    height: 50px;
    font-size: 20px;
    margin-top: 60px;
  }
`;

const Content = styled.textarea`
  display: flex;
  padding: 20px;
  border: 1px solid #ececec;
  background-color: #ececec;
  width: 600px;
  height: 500px;
  border-radius: 30px;
  font-size: 30px;
  margin-bottom: 30px;
  color: black;
  font-family: "DoHyeon-Regular", sans-serif;

  @media (max-width: 430px) {
    display: flex;
    width: 350px;
    height: 300px;
    font-size: 20px;
  }
`;

const BtnKing = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  width: 200px;
  height: 60px;
  background-color: black;
  color: white;
  border-radius: 30px;
  margin-right: 10px;
  border: 2px solid black;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    border: 2px solid black;
  }

  @media (max-width: 430px) {
    width: 110px;
    height: 30px;
    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const FooterWrapper = styled.div`
  display: none;

  @media (max-width: 430px) {
    display: block;
  }
`;

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateByteLength = (str) => {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      byteLength += str.charCodeAt(i) > 127 ? 3 : 1;
    }
    return byteLength;
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (calculateByteLength(value) <= 50) {
      setTitle(value);
    }
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    if (calculateByteLength(value) <= 300) {
      setContent(value);
    }
  };

  const handleKeyDown = (event, setter) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setter((prev) => {
        const newValue = prev + "\n";
        return calculateByteLength(newValue) <= (setter === setTitle ? 50 : 300)
          ? newValue
          : prev;
      });
    }
  };

  const handlePost = async () => {
    try {
      // 등록 요청 보내기
      await AxiosApi.boardWrite({ title, content }); // AxiosApi 사용하여 요청 보내기
      setIsSuccess(true); // 성공 시 isSuccess 상태를 true로 설정
      window.location.href = "/askme/board/success";
    } catch (error) {
      // 등록 실패 시 처리
      alert("글 등록에 실패했습니다.", error);
    }
  };

  return (
    <>
      <Toggle></Toggle>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Title>글 쓰기</Title>
          <TitleName
            placeholder="제목을 입력하세요"
            onChange={handleTitleChange}
            value={title}
            onKeyDown={(e) => handleKeyDown(e, setTitle)}
          />
          <Content
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
            onKeyDown={(e) => handleKeyDown(e, setContent)}
          />
          <BtnKing>
            <Btn onClick={handlePost}>등록</Btn>
            <Btn>
              <StyledLink to="/askme/board">돌아가기</StyledLink>
            </Btn>
          </BtnKing>
        </Container>
        <FooterWrapper>
          <Footer mtop={750} />
        </FooterWrapper>
      </motion.div>
    </>
  );
};

export default BoardWrite;
