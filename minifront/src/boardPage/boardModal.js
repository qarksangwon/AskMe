import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 65vh;
  background-color: #ececec;
  padding: 20px;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 30px;

  /* 반응형 스타일 */
  @media (max-width: 430px) {
    width: 90vw;
    height: 60vh;
    top: 50%;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  h1 {
    font-size: 40px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  @media (max-width: 430px) {
    justify-content: center;
    margin-top: 20px;
    order: 2; /* 버튼을 마지막에 렌더링하도록 설정 */
  }
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 120px;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 30px;
  border: 2px solid black;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.2s ease-in-out;
    border: 2px solid black;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  p {
    font-size: 30px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90vh;
  height: 80vh;
  margin-top: 30px;
  border-radius: 30px;

  p {
    padding: 30px;
    font-size: 25px;
  }

  /* 반응형 스타일 */
  @media (max-width: 430px) {
    width: 90%;
    height: 60%;
    order: 1; /* 컨텐츠 박스를 먼저 렌더링하도록 설정 */
  }
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const BoardModal = ({ board, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ModalBack>
        <ModalWrapper>
          <TitleBox>
            <h1>{board.title}</h1>
          </TitleBox>
          <NicknameBox>
            <p>
              {board.nickname}({board.id})
            </p>
          </NicknameBox>
          <ContentBox>
            <p>{board.content}</p>
          </ContentBox>
          <ButtonWrapper>
            <Btn>대화하기</Btn>
            <Btn className="close" onClick={onClose}>
              닫기
            </Btn>
          </ButtonWrapper>
        </ModalWrapper>
      </ModalBack>
    </motion.div>
  );
};

export default BoardModal;
