import styled from "styled-components";
import imgLogo from "../images/Logo.png";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import exit from "../images/exit.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const Logo = styled.img`
  width: 150px;
  height: 150px;
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
  @media (max-width: 430px) {
    width: 400px;
    height: 400px;
  }
`;

const Btn = styled.div`
  width: 160px;
  height: 180px;
  margin: 0px auto;
  background-color: black;
  color: white;
  border: 3px solid black;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 430px) {
    width: 100px;
    height: 120px;
    font-size: 16px;
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
const LinkDiv = styled(Link)`
  margin: auto;
`;

const EntranceContainer = styled.div`
  width: 140px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const EntranceBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  border: 2px solid black;
  border-radius: 10px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
`;

const ChatMain = ({ roomId, setRoomId }) => {
  const [chatEntrance, setChatEntrance] = useState("채팅방 입장하기");
  const [chatMake, setChatMake] = useState("채팅방 만들기");
  const roomRefs = useRef([]);
  const linkRef = useRef(null);

  const chatExist = async () => {
    try {
      const rst = await AxiosApi.checkExist(roomId); // 전체 목록 가져오기
      return rst;
    } catch (e) {
      console.log(e);
    }
  };

  const onClickIn = () => {
    console.log(roomId);
    console.log(chatExist());
    if (chatExist()) {
      linkRef.current.click();
    }
    // if (linkRef.current) {
    //   linkRef.current.click();
    // }
  };
  // 방 번호 input 값 핸들링
  // input 각 버튼에 대해 index를 지정해놓았기때문에
  // 해당 index에 맞는 값을 가져와서 5자리 배열(부모 컴포넌트에 있음)에
  // 각 index에 맞는 위치에 값 저장
  const handleInputRoom = (e, index) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return; // 문자 1개만 입력받도록
    const newValues = roomId;
    newValues[index] = newValue;
    setRoomId(newValues);
    console.log(roomId);
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
          <p>채팅방 번호 입력</p>
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
          <EntranceBtn onClick={onClickIn}>생성하기</EntranceBtn>
        </EntranceContainer>
      );
    }
    // 마우스를 내리면 설정한 값 초기화하면서 재지정할 수 있도록
    // (자릿수 똑같이 지정)
    else {
      setRoomId(["", "", "", "", ""]);
      setChatMake("채팅방 만들기");
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
          <p>채팅방 번호 입력</p>
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
          <EntranceBtn onClick={onClickIn}>입장</EntranceBtn>
        </EntranceContainer>
      );
    }
    // 마우스를 내리면 설정한 값 초기화하면서 재지정할 수 있도록
    // (자릿수 똑같이 지정)
    else {
      setRoomId(["", "", "", "", ""]);
      setChatEntrance("채팅방 입장하기");
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
            <LinkDiv to="/askme">
              <Btn>채팅방 삭제하기</Btn>
            </LinkDiv>
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
        <Footer top={900} mtop={732} />
      </Container>
    </>
  );
};

export default ChatMain;
