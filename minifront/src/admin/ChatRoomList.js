import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";
import Pagination from "react-js-pagination";
import BoardModal from "../boardPage/boardModal";
import { ScaleLoader } from "react-spinners";
import imgLogo from "../images/boardlogo.png";
import logosearch from "../images/search.png";
import exit from "../images/exit.png";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 10vh auto;
  padding: 20px;
  background-color: rgba(255, 219, 1, 0.2);
  border-radius: 10px;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "DoHyeon-Regular", sans-serif;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  @media (max-width: 390px) {
    width: 100px;
    height: 100px;
  }
`;

const Searchlogo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 100px;
  @media (max-width: 430px) {
    margin-right: 0px;
  }
`;

const Exit = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 20px;
  width: 220px;
  border-bottom: 3px solid rgb(255, 219, 1);
  font-size: 50px;
  color: #ffdb01;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;
`;

const RoomHead = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  display: flex;
  width: 230px;
  height: 50px;
  padding: 5px;
  margin-right: 10px;
  border: 3px solid rgb(255, 219, 1);
  font-family: "DoHyeon-Regular", sans-serif;
  font-size: 20px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 150px;
  height: 50px;
  background-color: rgb(255, 219, 1);
  border: 2px solid rgb(255, 219, 1);
  border-radius: 30px;
  margin-right: 10px;
  color: white;
  text-shadow: -1px -1px 0 #606060, 1px -1px 0 #606060, -1px 1px 0 #606060,
    1px 1px 0 #606060;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: white;
    color: black;
    border: 2px solid rgb(255, 219, 1);
    text-shadow: none;
    transition: all 0.2s ease-in-out;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const Tdfont = styled.div`
  display: flex;

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
    color: white;
    text-shadow: -1px -1px 0 #606060, 1px -1px 0 #606060, -1px 1px 0 #606060,
      1px 1px 0 #606060;
  }

  tbody tr:hover {
    background-color: rgb(255, 219, 1);
    cursor: pointer;
  }

  td {
    padding: 20px;
    border-bottom: 1px solid rgb(255, 219, 1);
    font-size: 25px;
    min-width: 220px;
  }

  th {
    height: 50px;
    border-bottom: 3px solid rgb(255, 219, 1);
    font-size: 35px;
    color: #ffdb01;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
      1px 1px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
      2px 2px 0 #fff;
    min-width: 220px;
  }
`;

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  bottom: 20px;
  width: 100%;
  padding: 10px 0;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 10px;
    cursor: pointer;
    font-size: 30px;
  }

  .pagination li a {
    text-decoration: none;
    color: rgb(255, 219, 1);
    text-shadow: -1px -1px 0 #606060, 1px -1px 0 #606060, -1px 1px 0 #606060,
      1px 1px 0 #606060;
  }

  .pagination li.active a {
    border-radius: 4px;
    padding: 7px;
    color: white;
    text-shadow: -1px -1px 0 #606060, 1px -1px 0 #606060, -1px 1px 0 #606060,
      1px 1px 0 #606060;
    background-color: rgb(255, 219, 1);
  }
`;

const Loading = styled.div`
  display: flex;
  width: 150px;
`;

const ChatRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalRooms, setOriginalRooms] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]); // 현재 활성화된 데이터셋을 추적하는 상태 추가
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredrooms, setFilteredrooms] = useState([]);

  const itemsPerPage = 4;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const RoomList = async () => {
    try {
      const rsp = await AxiosApi.getAllChat();
      setOriginalRooms(rsp.data);
      setActiveRooms(rsp.data); // 초기에는 originalRooms를 activeRooms로 설정
      setTotalItemsCount(rsp.data.length);
      setRooms(rsp.data.slice(0, itemsPerPage)); // 처음 로드 시 첫 페이지 데이터로 설정
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    RoomList();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentrooms = activeRooms.slice(startIndex, endIndex);
    setRooms(currentrooms);
  }, [page, activeRooms]);

  const Lodingwait = () => {
    setLoading(true); // 로딩 상태를 true로 설정
    setTimeout(() => {
      setLoading(false); // 700ms 후에 로딩 상태를 false로 설정
    }, 700);
  };

  const handleSearch = () => {
    setLoading(true); // 검색이 시작될 때 로딩 상태 활성화

    setTimeout(() => {
      if (searchTerm === "") {
        setFilteredrooms(originalRooms);
        setActiveRooms(originalRooms);
        setTotalItemsCount(originalRooms.length);
      } else {
        const searchResults = originalRooms.filter(
          (room) =>
            room.id && room.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredrooms(searchResults);
        setActiveRooms(searchResults);
        setTotalItemsCount(searchResults.length);
      }
      setLoading(false); // 검색이 완료되면 로딩 상태 비활성화
      setPage(1); // 페이지 상태를 첫 페이지로 초기화
    }, 700);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("채팅방을 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await AxiosApi.deleteChat(id);
        alert("삭제가 완료되었습니다.");
        RoomList(); // 삭제 후 목록을 다시 불러옵니다.
      } catch (error) {
        console.error("채팅방 삭제 중 오류 발생:", error);
        alert("채팅방 삭제 중 오류가 발생했습니다.");
      }
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
          <Logo src={imgLogo} />
          <Title>채팅방 목록</Title>

          <RoomHead>
            <SearchInput
              placeholder="검색 제목 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Searchlogo
              src={logosearch}
              onClick={() => {
                handleSearch();
              }}
            />
            <Loading>
              {loading && <ScaleLoader width={5} color="black" />}
            </Loading>
            <Link to="/askme/admin">
              <Exit src={exit} />
            </Link>
          </RoomHead>

          <Tdfont>
            <table>
              <thead>
                <tr>
                  <th>사용자 아이디</th>
                  <th>채팅방 번호</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {rooms &&
                  rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.id}</td>
                      <td>{room.roomid}</td>
                      <td>
                        <DeleteButton onClick={() => handleDelete(room.id)}>
                          삭제
                        </DeleteButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tdfont>
          <PageStyle>
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={100}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
          </PageStyle>
        </Container>

        {isModalOpen && (
          <BoardModal board={selectedRoom} onClose={closeModal} />
        )}
      </motion.div>
    </>
  );
};

export default ChatRoomList;
