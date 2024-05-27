import styled from "styled-components";
import imgLogo from "../images/Logotest.gif";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import exit from "../images/exit.png";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 30px;
  @media (max-width: 430px) {
    width: 100px;
    height: 100px;
  }
`;

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Body = styled.div`
  position: absolute;
  top: 10px;
  margin-top: 20px;
  width: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  @media (max-width: 431px) {
    width: 400px;
    height: 400px;
    flex-direction: column;
  }
`;

const Btn = styled.div`
  width: 160px;
  height: 180px;
  margin: 0px auto;
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
    height: 120px;
    margin: auto 0px;
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

const EntranceContainer = styled.div`
  width: 140px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 431px) {
    font-size: 10px;
  }
`;

const InputRoomContainer = styled.div`
  display: flex;
  width: 100%;
`;

const InputRoom = styled.input`
  width: 24px;
  height: 36px;
  text-align: center;
  margin: auto;
  background-color: #ececec;
  border: 0px;
  border-radius: 4px;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 431px) {
    width: 24px;
    height: 26px;
  }
`;

const EntranceBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #acb3fd;
  color: white;
  border: 2px solid #acb3fd;
  border-radius: 10px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: white;
    color: #acb3fd;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 431px) {
    width: 100px;
    height: 20px;
    font-size: 14px;
  }
`;

const ChatMain = ({ roomId, setRoomId }) => {
  const [chatEntrance, setChatEntrance] = useState("채팅방 입장하기");
  const [chatMake, setChatMake] = useState("채팅방 만들기");
  const [isRoom, setIsRoom] = useState();
  const [isMyRoom, setIsMyRoom] = useState();
  const [inOrMake, setInOrMake] = useState(0);
  const [isDel, setIsDel] = useState();
  const roomRefs = useRef([]);
  const linkRef = useRef(null);
  const isMobile = window.innerWidth <= 430;

  //자기 채팅방 삭제하는 핸들러
  const handleChatDelete = async () => {
    try {
      setIsDel(3);
      const response = await AxiosApi.deleteChatRoom();
      setIsDel(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDeleteChatRoom = () => {
    if (window.confirm("채팅방을 삭제하시겠습니까?")) {
      handleChatDelete(); // 확인 버튼을 누르면 삭제 함수를 호출합니다.
    }
  };
  const chatExist = async () => {
    try {
      for (const element of roomId)
        if (element === "") {
          alert("모두 입력해 주세요");
          return;
        }
      const response = await AxiosApi.checkExist(roomId); // 전체 목록 가져오기
      setIsRoom(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 실제로 방 만들기
  const insertChatRoom = async () => {
    try {
      const response = await AxiosApi.insertChatRoom(roomId);
      setIsMyRoom(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickIn = (val) => {
    chatExist();
    // 매개변수 1 -> 채팅방 만들기 -> inOrMake 1은 만들기
    // 매개변수 2 -> 채팅방 입장하기 -> inOrMake 2는 입장하기
    if (val === 1) setInOrMake(1);
    else setInOrMake(2);
  };

  // 비동기로 해당 방이 존재하는지 체크하기 때문에
  // useEffect로 isRoom이 set 됐을 때 로직을 구현해야함.
  //
  useEffect(() => {
    // 채팅방 만들 때 isRoom 이 true면 못 만들게 알람
    // 입장할 때 isRoom 이 false면 못 입장하게 알람
    console.log("isroom : ", isRoom);
    console.log(inOrMake);

    if (inOrMake === 1) {
      if (isRoom) alert("이미 있는 채팅방 입니다.");
      else if (!isRoom) {
        insertChatRoom();
        console.log("isMyRoom : ", isMyRoom);
      }
    }
    if (inOrMake === 2) {
      if (!isRoom) alert("없는 채팅방 입니다.");
      else linkRef.current.click();
    }
  }, [isRoom]);

  useEffect(() => {
    if (isMyRoom !== undefined) {
      if (isMyRoom === 0) {
        alert("이미 방 가지고 있음");
      } else {
        linkRef.current.click();
      }
    }
  }, [isMyRoom]);

  useEffect(() => {
    if (isDel !== undefined) {
      if (isDel === 0) alert("만든 방이 없습니다.");
    }
  }, [isDel]);

  // 방 번호 input 값 핸들링
  // input 각 버튼에 대해 index를 지정해놓았기때문에
  // 해당 index에 맞는 값을 가져와서 5자리 배열(부모 컴포넌트에 있음)에
  // 각 index에 맞는 위치에 값 저장
  const handleInputRoom = (e, index) => {
    const newValue = e.target.value;
    const regex = /^[0-9a-z]$/;
    // 영어 소문자와 0~9까지만 입력 가능한 정규식 적용
    if (!regex.test(newValue)) {
      roomRefs.current[index].value = "";
      return;
    }
    if (newValue.length > 1) return; // 문자 1개만 입력받도록
    const newValues = roomId;
    newValues[index] = newValue;
    setRoomId(newValues);
    if (newValue && index < roomRefs.current.length - 1) {
      roomRefs.current[index + 1].focus();
    }
  };
  const handleChatMake = () => {
    // 마우스 올려 놨을 때 채팅방 번호 누르도록 띄워주고
    // 방 번호 입력해서 입장하도록.
    // 지정한 크기만큼 input을 만들어 각 버튼에 한자리씩 넣어서
    // 해당 값이 넘어가도록 지정
    if (chatMake === "채팅방 만들기") {
      setChatMake(
        <EntranceContainer>
          <p style={isMobile ? { fontSize: 14 } : { fontSize: 20 }}>
            채팅방 번호 입력
          </p>
          <InputRoomContainer>
            {roomId.map((value, index) => (
              <InputRoom
                key={index}
                onChange={(e) => handleInputRoom(e, index)}
                ref={(el) => (roomRefs.current[index] = el)}
                maxLength="1"
              ></InputRoom>
            ))}
          </InputRoomContainer>
          <EntranceBtn onClick={() => onClickIn(1)}>생성하기</EntranceBtn>
          <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
            영어 소문자 / 숫자 입력
          </div>
        </EntranceContainer>
      );
    }
    // 마우스를 내리면 설정한 값 초기화하면서 재지정할 수 있도록
    // (자릿수 똑같이 지정)
    else {
      setRoomId(["", "", "", "", ""]);
      setChatMake("채팅방 만들기");
      setIsRoom();
      setInOrMake(0);
      setIsMyRoom();
    }
  };

  const handleChatEntrance = () => {
    // 마우스 올려 놨을 때 채팅방 번호 누르도록 띄워주고
    // 방 번호 입력해서 입장하도록.
    // 지정한 크기만큼 input을 만들어 각 버튼에 한자리씩 넣어서
    // 해당 값이 넘어가도록 지정
    if (chatEntrance === "채팅방 입장하기") {
      setChatEntrance(
        <EntranceContainer>
          <p style={isMobile ? { fontSize: 14 } : { fontSize: 20 }}>
            채팅방 번호 입력
          </p>
          <InputRoomContainer>
            {roomId.map((value, index) => (
              <InputRoom
                key={index}
                onChange={(e) => handleInputRoom(e, index)}
                ref={(el) => (roomRefs.current[index] = el)}
                maxLength="1"
              ></InputRoom>
            ))}
          </InputRoomContainer>
          <EntranceBtn onClick={() => onClickIn(2)}>입장</EntranceBtn>
          <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
            영어 소문자 / 숫자 입력
          </div>
        </EntranceContainer>
      );
    }
    // 마우스를 내리면 설정한 값 초기화하면서 재지정할 수 있도록
    // (자릿수 똑같이 지정)
    else {
      setRoomId(["", "", "", "", ""]);
      setChatEntrance("채팅방 입장하기");
      setIsRoom();
      setInOrMake(0);
      setIsMyRoom();
    }
  };
  return (
    <>
      <Link to="/askme/chat" ref={linkRef} style={{ display: "none" }}>
        Hidden Link
      </Link>
      <Container>
        <Toggle />
        <Body>
          <Logo src={imgLogo} />
          <BtnContainer>
            <Btn onMouseEnter={handleChatMake} onMouseLeave={handleChatMake}>
              {chatMake}
            </Btn>
            <Btn onClick={confirmDeleteChatRoom}>채팅방 삭제하기</Btn>
            <Btn
              onMouseEnter={handleChatEntrance}
              onMouseLeave={handleChatEntrance}
            >
              {chatEntrance}
            </Btn>
          </BtnContainer>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </Body>
      </Container>
      <Footer />
    </>
  );
};

export default ChatMain;
