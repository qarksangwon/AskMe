import styled from "styled-components";
import send from "../images/send.png";
import { useEffect, useRef, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { Link } from "react-router-dom";
import exit from "../images/exit.png";
import "./chat.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  width: 100vw;
  height: 5vh;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatContainer = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: auto;
  border: 2px solid black;
  border: 0px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 10px;
`;

const SendContainer = styled.div`
  width: 100%;
  height: 50px;
  border-top: 2px solid black;
  display: flex;
`;

const Input = styled.input`
  width: 84%;
  height: 46px;
  border: 0px;
  font-size: 14px;
  border-radius: 0px 0px 0px 30px;
  padding-left: 18px;
  outline: none;
`;

const SendBtn = styled.div`
  cursor: pointer;
  width: 16%;
  height: 48px;
  border-left: 2px solid black;
  border-radius: 0px 0px 30px 0px;
  transition: all 0.1s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.1s ease-in;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SendBtnImg = styled.img`
  width: 40px;
  height: 40px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 280px;
  max-height: 70px;
  width: fit-content;
  height: fit-content;
  padding-top: 12px;
`;

const Message = styled.div`
  display: flex;
  padding: 8px;
  max-width: 280px;
  max-height: 70px;
  width: fit-content;
  height: fit-content;
  border: 2px solid black;
  border-radius: 6px;
`;

const MessageBoxContainer = styled.div`
  width: 400px;
  height: auto;
  display: flex;
`;

const Exit = styled.img`
  position: relative;
  top: -2px;
  width: 54px;
  height: 54px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const ChatM = ({ roomId }) => {
  // 부모 컴포넌트에서 받은 roomId는 배열이기떄문에 문자열로 재지정
  const roomNum = roomId.join("");
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const ws = useRef(null); // 웹소켓 객체
  const [msgContent, setMsgContent] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [myNickName, setMyNickName] = useState("");

  //웹소켓 연결
  useEffect(() => {
    if (!ws.current) {
      // ws.current = new WebSocket(`ws://192.168.10.17:8111/ws/chat`);
      ws.current = new WebSocket(`ws://localhost:8111/ws/chat`);
      console.log(ws.current);
      ws.current.onopen = () => {
        console.log("웹 소켓 connection established");
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          // 서버에 입장 -> 현재 내 입장 방번호에 내 세션 등록하기 위함
          type: "ENTER",
          roomId: roomNum,
          nickName: "test",
          message: "처음으로 접속 합니다.",
        })
      );
    }

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.type !== "CANVAS") {
        setMsgContent((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.current.onclose = (event) => {
      console.log("웹 소켓 connection closed : ", event);
    };
    return () => {
      // 컴포넌트 언마운트 시 웹소켓 해제
      ws.current.onclose();
    };
  }, [socketConnected]);

  useEffect(() => {
    const currentMsg = async () => {
      try {
        const response = await AxiosApi.chatList(roomNum);
        setMsgContent(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    currentMsg();
    setMyNickName(localStorage.getItem("userNickname"));
  }, []);

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      // 엔터키 입력시, 공백 제거 후 비어있지 않으면
      e.preventDefault();
      onClickMsgSend(e);
      console.log(roomNum);
    }
  };

  const onClickMsgSend = (e) => {
    if (inputMessage.trim() !== "") {
      // 메시지 전송
      ws.current.send(
        JSON.stringify({
          type: "TALK",
          roomId: roomNum,
          nickName: myNickName,
          message: inputMessage,
        })
      );

      console.log("onClickMsgSend run");
      console.log(inputMessage);
      setInputMessage("");
    }
  };

  const msgOnChange = (e) => {
    const value = e.target.value;
    const maxLength = 50;
    const regex = new RegExp(`^.{0,${maxLength}}$`);
    if (regex.test(value)) {
      setInputMessage(value);
      setErrorMsg(false);
    } else {
      setErrorMsg(true);
    }
  };
  // 채팅 하단 자동 스크롤
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      // 채팅 컨테이너가 존재하면
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // 스크롤을 맨 아래로
    }
  }, [msgContent]); // chatList 값이 변경되면 useEffect 실행

  return (
    <>
      <Container>
        <Navbar>
          <p style={{ marginLeft: 10 }}> 방 번호 : {roomNum}</p>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </Navbar>
        <ChatContainer>
          <MessagesContainer ref={chatContainerRef}>
            {msgContent.map((chat, index) => (
              <MessageBoxContainer
                style={{
                  justifyContent:
                    chat.nickName === myNickName ? "flex-end" : "flex-  start",
                }}
                key={index}
              >
                <MessageBox>
                  <p>{chat.nickName === myNickName ? "" : chat.nickName}</p>
                  <Message>{chat.message}</Message>
                </MessageBox>
              </MessageBoxContainer>
            ))}
          </MessagesContainer>
          <SendContainer>
            <Input
              onKeyUp={onEnterKey}
              onChange={msgOnChange}
              value={inputMessage}
            />
            <SendBtn onClick={onClickMsgSend}>
              <SendBtnImg src={send} />
            </SendBtn>
          </SendContainer>
        </ChatContainer>
      </Container>
    </>
  );
};

export default ChatM;
