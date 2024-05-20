import styled from "styled-components";
import Toggle from "../customComponent/Toggle";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 10vh auto auto auto; /* 위아래는 100px, 좌우는 자동으로 중앙에 정렬됩니다. */
  background-color: white;
  text-align: center; /* 내용을 가운데 정렬합니다. */
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
  justify-content: center; /* 세로 방향 중앙 정렬 */
`;

const Title = styled.div`
  width: 110px;
  border-bottom: 3px solid black; /* 밑줄을 추가합니다. */
  font-size: 40px;
  margin-bottom: 20px;

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
  margin-bottom: 30px;
  font-family: "DoHyeon-Regular", sans-serif;

  @media (max-width: 430px) {
    width: 350px;
    height: 50px;
    font-size: 20px;
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
  justify-content: center; /* 중앙 정렬 */
  font-size: 25px;
  width: 140px;
  height: 50px;
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
  color: inherit; /* 부모 요소의 색상을 상속받습니다. */
`;

const BoardWrite = () => {
  // 입력한 제목과 내용 상태를 관리합니다.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 엔터 키가 눌렸을 때 줄 바꿈을 처리하는 함수입니다.
  const handleKeyDown = (event, setter) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지
      setter((prev) => prev + "\n"); // 현재 값에 줄 바꿈 문자 추가
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
          {/* 제목 입력란 */}
          <TitleName placeholder="제목을 입력하세요" />
          {/* 내용 입력란 */}
          <Content
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, setContent)}
          />
          <BtnKing>
            <Btn>등록 </Btn>
            <Btn>
              <StyledLink to="/askme/board"> 돌아가기</StyledLink>
            </Btn>
          </BtnKing>
        </Container>
      </motion.div>
    </>
  );
};

export default BoardWrite;
