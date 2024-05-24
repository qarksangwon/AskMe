import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion, useScroll } from "framer-motion";
import AxiosApi from "../api/AxiosApi";
import ImageUploader from "../firebase/ImageUploader";
import ImageDisplayByName from "../api/ImageDisplayByName";
import { Link } from "react-router-dom";
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 100vh;
  height: 65vh;
  background-color: #ececec;
  padding: 20px;
  position: fixed;
  top: 50%;
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
const Profile = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  h1 {
    font-size: 40px;
  }
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
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
  margin-left: 20px;

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

const Room = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  width: 16.35vh;
  height: 7vh;
  border: 3px solid black;
  color: white;
  background-color: black;
  @media (max-width: 430px) {
    font-size: 20px;
    width: 17vh;
    height: 4vh;
  }
`;

const ContentBox = styled.div`
  display: flex;
  margin: auto; //중앙 정렬을 위해
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

const IsMyPost = styled.div`
  //삭제하기
  display: block;
`;
const IsMyPost2 = styled.div`
  //채팅입장
  display: block;
`;

const Logincheck = styled.div`
  display: block;
`;

const BoardModal = ({ board, onClose, roomId, setRoomId }) => {
  const isMyPost = localStorage.getItem("userNickname") === board.nickname; //같으면 삭제하기
  const isMyPost2 = localStorage.getItem("userNickname") !== board.nickname; //다르면 채팅입장

  const logincheck = localStorage.getItem("userId") !== "null";
  console.log(localStorage.getItem("userId"));
  console.log(`클래스넘버${board.classNo}`);

  const [isDel, setIsDel] = useState(false);
  const [findid, setFindid] = useState();
  const linkRef = useRef(null);

  const handleBoardDelete = async () => {
    try {
      await AxiosApi.boardDelete(board.classNo);
      setIsDel(true);
      // 성공적으로 삭제되었음을 나타내기 위한 추가 로직이 필요할 수 있습니다.
    } catch (e) {
      console.log(e);
      // 에러 처리를 위한 추가 로직이 필요할 수 있습니다.
    }
  };

  const confirmDeleteBoard = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      handleBoardDelete(); // 확인 버튼을 누르면 삭제 함수를 호출합니다.
    }
  };

  useEffect(() => {
    if (isDel) {
      window.location.reload();
      alert("삭제가 완료 되었습니다.");
    }
  }, [isDel]);

  const FindRoomId = async () => {
    try {
      const rsp = await AxiosApi.findRoomId(board.id);
      setFindid(rsp.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FindRoomId();
  }, []);

  const linkToChat = () => {
    console.log("방번호잉", findid);
    if (findid === "") {
      alert("방 없어!");
    } else {
      setRoomId([findid[0], findid[1], findid[2], findid[3], findid[4]]);
      linkRef.current.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 1.3 }} // 딜레이 주는 이유 : 이미지 업로드하느라 살짝 버벅거리는 거 안 보이게 할라고
    >
      <ModalBack>
        <ModalWrapper>
          <Profile>
            <ImageDisplayByName filename={board.nickname} />
          </Profile>
          <TitleBox>
            <h1>{board.title}</h1>
          </TitleBox>
          <NicknameBox>
            <p>닉네임 : {board.nickname}</p>
          </NicknameBox>
          <Room>
            <p>채팅방 번호 : {findid && findid}</p>
          </Room>
          <ContentBox>
            <p>{board.content}</p>
          </ContentBox>

          <ButtonWrapper>
            <Logincheck>
              {logincheck && (
                <>
                  <IsMyPost isMyPost={isMyPost} onClick={confirmDeleteBoard}>
                    {isMyPost && <Btn>삭제하기</Btn>}
                  </IsMyPost>
                  <IsMyPost2 isMyPost={isMyPost2}>
                    <Link
                      to="/askme/chat"
                      ref={linkRef}
                      style={{ display: "none" }}
                    >
                      Hidden Link
                    </Link>
                    {isMyPost2 && <Btn onClick={linkToChat}>채팅 입장</Btn>}
                  </IsMyPost2>
                </>
              )}
            </Logincheck>
            <Btn onClick={onClose} className="close">
              닫기
            </Btn>
          </ButtonWrapper>
        </ModalWrapper>
      </ModalBack>
    </motion.div>
  );
};

export default BoardModal;
