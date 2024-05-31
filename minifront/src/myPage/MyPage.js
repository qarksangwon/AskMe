import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import exit from "../images/exit.png";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import { ref, getDownloadURL } from "firebase/storage";
import profileLogo from "../images/profileLogo.png";
import { storage } from "../api/Fb";

const Container = styled.div`
  background-color: #acb3fd;
  border-radius: 30px;
  width: 70vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Change to space-between */
  align-items: center;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  @media (max-width: 430px) {
    height: auto;
  }
`;

const Body = styled.div`
  width: 100%; /* Change to 100% to take full width */
  flex: 1; /* Add flex-grow to take available space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.div`
  width: 20vh;
  height: 6vh;
  font-size: 2vh;
  background-color: white;
  color: black;
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: all 0.5s ease-in-out;
  position: relative;
  transform-style: preserve-3d;
  border: 3px solid #ebecff;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: 300;
    transition: all 0.3s ease-in-out;
    border: 3px solid black;
  }
  @media (max-width: 430px) {
    margin-bottom: 20px;
    width: 180px;
    height: 50px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
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
  @media (max-width: 430px) {
    margin-top: 10px;
  }
`;

const FoundIdMessage = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #262626;
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: #f0f0f0;
  span {
    color: #d147e5;
  }
`;

const UserInfo = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid #d6d9fe;
  border-radius: 10%;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  margin-right: 30px;
  margin-left: 20px;
  @media (max-width: 430px) {
    margin-right: 10px;
  }
`;

const UserName = styled.div`
  margin-top: 25px;
  span {
    color: #b43cc2;
  }
  div {
    margin-bottom: 6px;
  }
  div:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 430px) {
    margin-top: 30px;
    font-size: 13px;
  }
`;
const UserNick = styled.div`
  margin-top: 25px;
  font-size: 23px;
  span {
    color: #d147e5;
  }
  @media (max-width: 430px) {
    font-size: 20px;
  }
`;

const MyPage = () => {
  const [isIdFound, setIsIdFound] = useState(false);
  const [isClick, setIsClick] = useState(true);
  const [roomNum, setroomNum] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [UserNickname, setUserNickname] = useState("");
  const [imageUrl, setImageUrl] = useState(profileLogo);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setUserNickname(localStorage.getItem("userNickname"));
    setUserName(localStorage.getItem("userName"));
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  const handleButtonClick = async () => {
    try {
      const response = await AxiosApi.getRoomId(userId);
      setroomNum(response.data);
      setIsIdFound(true);
    } catch (error) {
      console.error(error);
    }
  };

  const ImgClick = async () => {
    try {
      setIsClick(true);
    } catch (error) {
      console.error(error);
    }
  };

  const editExit = useNavigate();
  const exitClick = () => {
    setIsIdFound(false);
    editExit("/askme");
  };
  const exitClick2 = () => {
    setIsIdFound(false);
    editExit("/askme/mypage");
  };

  useEffect(() => {
    if (userId) {
      const imageRef = ref(storage, `images/${userId}`);
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
          setTimeout(() => {
            setVisible(true); // 1초 후에 visible 상태를 true로 변경
          }, 300);
        })
        .catch((error) => {
          console.error("이미지 다운로드 URL 가져오기 실패:", error);
          setVisible(true);
        });
    }
  }, [userId]);

  return (
    <>
      <Container>
        <Toggle />
        <Body>
          <UserInfo>
            <ProfileImage
              onClick={ImgClick}
              src={imageUrl}
              filename={userId}
              visible={visible}
            />
            <UserName>
              <div>
                아이디 : <span>{userId}</span>
              </div>
              <div>
                이름 : <span>{userName}</span>
              </div>
              <div>
                이메일 : <span>{userEmail}</span>
              </div>
            </UserName>
          </UserInfo>
          <UserNick>
            <span>{UserNickname}</span> 님 안녕하세요.
          </UserNick>
          {isIdFound ? (
            <>
              <FoundIdMessage>
                나의 채팅방 번호 : <span>{roomNum}</span>
              </FoundIdMessage>
              <Exit onClick={exitClick2} src={exit} />
            </>
          ) : (
            <>
              <ButtonContainer>
                <Link to="/askme/mypage/confirm">
                  <Btn>정보 수정</Btn>
                </Link>
                <Btn onClick={handleButtonClick}>나의 채팅방</Btn>
                <Link to="/askme/userdel">
                  <Btn>회원 탈퇴</Btn>
                </Link>
              </ButtonContainer>
              <Exit onClick={exitClick} src={exit} />
            </>
          )}
        </Body>
      </Container>
      <Footer />
    </>
  );
};

export default MyPage;
