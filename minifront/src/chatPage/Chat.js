import styled from "styled-components";
import send from "../images/send.png";
import { useEffect, useRef, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { fabric } from "fabric";
import { Link } from "react-router-dom";
import exit from "../images/exit.png";
import "./chat.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ChatBtnContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 1px;
  width: 100px;
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
  border-bottom-left-radius: ${(props) => props.active};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.2s ease-in;
  }
`;

const Chatroom = styled.div`
  position: fixed;
  right: 1px;
  top: 60px;
  width: auto;
  height: 400px;
  border: 3px solid black;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(${(props) => props.active});
  transition: all 0.5s ease-in-out;
  margin-bottom: 10px;
  background-color: white;
`;

const MessagesContainer = styled.div`
  width: 500px;
  height: 360px;
  border: 2px solid black;
  border: 0px;
  padding: 0px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

const MessageBoxContainer = styled.div`
  width: 400px;
  height: auto;
  display: flex;
`;

const Canvas = styled.canvas`
  border: 3px solid black;
  margin: 0;
  width: 1200px;
  height: 800pxpx;
`;

const CanvasBtn = styled.button`
  position: relative;

  width: 40px;
  height: 40px;
  border: 0;
  margin: auto;
  padding: 0;
  border-radius: 10px;
  cursor: pointer;
`;
const Exit = styled.img`
  position: relative;
  top: -3px;
  width: 54px;
  height: 54px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Chat = ({ roomId }) => {
  // 부모 컴포넌트에서 받은 roomId는 배열이기떄문에 문자열로 재지정
  const roomNum = roomId.join("");
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const ws = useRef(null); // 웹소켓 객체
  const [btnText, setBtnText] = useState("채팅창 열기");
  const [msgContent, setMsgContent] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [myNickName, setMyNickName] = useState("test");
  const canvasRef = useRef(null); // 캔버스 객체, 반환할 HTML canvas 객체에 대한 참조로 사용
  const [canvas, setCanvas] = useState(null); // Fabric.js 사용한 캔버스 객체 상태 저장 용도
  const [activeTool, setActiveTool] = useState("select");

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
      console.log(newMessage);
      if (newMessage.type === "CANVAS") {
        // 캔버스 데이터를 받아서 처리하는 부분
        // 예를 들어, 받은 데이터를 파싱하고 캔버스에 그리는 작업을 수행할 수 있습니다.
        const canvasData = JSON.parse(newMessage.drawing);
        canvas.loadFromJSON(canvasData, () => {
          // 캔버스에 객체를 추가한 후 캔버스를 다시 랜더링
          canvas.renderAll();
        });
      } else {
        setMsgContent((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    ws.current.onclose = () => {
      console.log("웹 소켓 connection closed");
    };
    return () => {
      // 컴포넌트 언마운트 시 웹소켓 해제
      ws.current.onclose();
    };
  }, [socketConnected]);

  // 첫 페이지 로딩시 canvas 로딩
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
    // setMyNickName(localStorage.getItem("userNickname"));
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: 1200,
        height: 800,
      });

      newCanvas.on("mouse:wheel", function (opt) {
        const delta = opt.e.deltaY;
        let zoom = newCanvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        newCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      newCanvas.on("object:modified", () => {
        ws.current.send(
          JSON.stringify({
            type: "CANVAS",
            roomId: roomNum,
            nickName: myNickName,
            drawing: JSON.stringify(newCanvas.toJSON()),
          })
        );
      });

      setCanvas(newCanvas);

      return () => {
        // 컴포넌트 언마운트 시 메모리에서 캔버스 제외, .dispose 사용
        newCanvas.dispose();
      };
    }
  }, [canvasRef.current]);

  // 선택 도구를 골랐을 때, 펜 도구를 골랐을 때
  const handleSelectTool = () => {
    canvas.isDrawingMode = false;
  };
  const handlePenTool = () => {
    canvas.freeDrawingBrush.width = 3;
    canvas.isDrawingMode = true;
  };
  // activeTool이 변할 때 실제 기능도 변하게 하는 useEffect 훅
  useEffect(() => {
    if (!canvasRef.current || !canvas) return;
    // 주석을 추가해 switch 문의 default case가 없음을 경고 안뜨게 하기 위함
    // eslint-disable-next-line default-case
    switch (activeTool) {
      case "select":
        handleSelectTool();
        break;

      case "pen":
        handlePenTool();
        break;
    }
  }, [activeTool]);

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      // 엔터키 입력시, 공백 제거 후 비어있지 않으면
      e.preventDefault();
      onClickMsgSend(e);
      console.log(roomNum);
    }
  };

  const onClickMsgSend = (e) => {
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
  };

  const openChat = () => {
    if (btnText === "채팅창 열기") {
      console.log(roomNum);
      setBtnText("닫기");
      console.log(msgContent);
      setIsActive(false);
    }
    if (btnText === "닫기") {
      setInputMessage("");
      setErrorMsg(false);
      setBtnText("채팅창 열기");
      setIsActive(true);
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
        <Canvas ref={canvasRef} />
        <div className="optionContainer">
          <CanvasBtn
            onClick={() => setActiveTool("select")}
            disabled={activeTool === "select"}
          >
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="-7 0 60 46"
            >
              <g>
                <path
                  d="M43.154,15.709v10.354c0,11.247-9.044,20.75-19.747,20.75S3.66,37.311,3.66,26.063V15.709C3.66,11.12,5.47,0.633,21.825,0
		v5.309c-1.779,0.65-3.061,2.344-3.061,4.347v5.684c0,2.003,1.281,3.696,3.061,4.347v4.832c0,0.873,0.709,1.582,1.582,1.582
		s1.582-0.709,1.582-1.582v-4.832c1.778-0.65,3.062-2.344,3.062-4.347V9.657c0-2.003-1.281-3.696-3.062-4.347V0
		C41.345,0.634,43.154,11.12,43.154,15.709z"
                />
              </g>
            </svg>
          </CanvasBtn>
          <CanvasBtn
            onClick={() => setActiveTool("pen")}
            disabled={activeTool === "pen"}
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              id="_24x24_On_Light_Edit"
              data-name="24x24/On Light/Edit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect id="view-box" width="24" height="24" fill="none" />
              <path
                id="Shape"
                d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z"
                transform="translate(3.25 3.25)"
              />
            </svg>
          </CanvasBtn>
          <Link to="/askme">
            <Exit src={exit} />
          </Link>
        </div>
        <ChatBtnContainer>
          <ChatOpenBtn active={isActive ? "10px" : "0px"} onClick={openChat}>
            {btnText}
          </ChatOpenBtn>
        </ChatBtnContainer>
        <Chatroom active={isActive ? "calc(100% + 20px)" : "0"}>
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
        </Chatroom>
        {errorMsg && (
          <p style={{ color: "red" }}>50글자 이상 입력 불가능 합니다.</p>
        )}
      </Container>
    </>
  );
};

export default Chat;
