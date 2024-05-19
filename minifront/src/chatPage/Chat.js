import styled from "styled-components";
import send from "../images/send.png";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ececec;
`;
const ChatroomContainer = styled.div`
  position: fixed;
  right: 1px;
  top: 4%;
  width: auto;
  height: 440px;
  display: flex;
  flex-direction: column;
`;

const ChatBtnContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: right;
`;

const ChatOpenBtn = styled.div`
  width: 100px;
  height: 40px;
  font-size: 18px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.active ? "0px" : "10px")};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
`;

const Chatroom = styled.div`
  width: auto;
  height: 400px;
  border: 3px solid black;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(
    ${({ active }) => (active ? "0" : "calc(100% + 20px)")}
  );
  transition: all 0.5s ease-in-out;
  margin-bottom: 10px;
`;

const MessagesContainer = styled.div`
  width: 500px;
  height: 360px;
  border: 2px solid black;
  border: 0px;
  padding: 0px 20px 20px 20px;
  display: flex;
  flex-direction: column;
`;

const SendContainer = styled.div`
  width: 500px;
  height: 50px;
  border-top: 3px solid black;
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
  border-left: 3px solid black;
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

const Chat = ({ roomId }) => {
  // 부모 컴포넌트에서 받은 roomId는 배열이기떄문에 문자열로 재지정
  const roomNum = roomId.join("");
  const [btnText, setBtnText] = useState("채팅창 열기");
  const [isActive, setIsActive] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const openChat = () => {
    if (btnText === "채팅창 열기") {
      console.log(roomNum);
      setBtnText("닫기");
      setIsActive(true);
    }
    if (btnText === "닫기") {
      setInputMessage("");
      setErrorMsg(false);
      setBtnText("채팅창 열기");
      setIsActive(false);
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

  return (
    <>
      <Container>
        <ChatroomContainer>
          <ChatBtnContainer>
            <ChatOpenBtn acitve={isActive} onClick={openChat}>
              {btnText}
            </ChatOpenBtn>
          </ChatBtnContainer>
          <Chatroom active={isActive}>
            <MessagesContainer>
              <MessageBox>
                <p>닉네임</p>
                <Message>가가가가가가가가가가가가가가가가가가가가</Message>
              </MessageBox>
              <MessageBox>
                <p>닉네임</p>
                <Message>가가</Message>
              </MessageBox>
            </MessagesContainer>
            <SendContainer>
              <Input onChange={msgOnChange} value={inputMessage} />
              <SendBtn>
                <SendBtnImg src={send} />
              </SendBtn>
            </SendContainer>
          </Chatroom>
          {errorMsg && (
            <p style={{ color: "red" }}>50글자 이상 입력 불가능 합니다.</p>
          )}
        </ChatroomContainer>
      </Container>
    </>
  );
};

export default Chat;
