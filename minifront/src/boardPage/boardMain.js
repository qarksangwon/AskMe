import logosearch from "../images/search.png";
import exit from "../images/exit.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";
import Pagination from "react-js-pagination";
import BoardModal from "./boardModal";
import { PacmanLoader } from "react-spinners";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 10vh auto auto auto;
  padding: 120px;
  background-color: white;
  border-radius: 10px;

  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "DoHyeon-Regular", sans-serif;
`;

const Searchlogo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 200px;
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
  width: 100px;
  border-bottom: 3px solid black;
  font-size: 40px;
`;

const Boardhead = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  display: flex;
  width: 220px;
  height: 40px;
  padding: 5px;
  margin-right: 10px;
  border: 3px solid black;
  font-family: "DoHyeon-Regular", sans-serif;
  font-size: 20px;
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
`;

const Tdfont = styled.div`
  display: flex;

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px;
  }

  tbody tr:hover {
    background-color: #ececec;
    cursor: pointer;
  }

  td {
    padding: 20px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 20px;
    min-width: 220px;
  }

  th {
    height: 50px;
    border-bottom: 3px solid black;
    font-size: 30px;
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
    color: black;
  }

  .pagination li.active a {
    border: 2px solid black;
    border-radius: 4px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    background-color: black;
  }
`;

const Loading = styled.div`
  display: flex;
`;

const BtnWrite = styled.div``;

const BtnMyWrite = styled.div``;

const Board = () => {
  console.log(localStorage.getItem("userId"));
  console.log(localStorage.getItem("userNickname"));
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalBoards, setOriginalBoards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // 사용자가 로그인되어 있는지 확인하는 함수
  const checkLoginStatus = () => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // userId가 존재하면 true, 존재하지 않으면 false
  };

  useEffect(() => {
    checkLoginStatus(); // 페이지가 로드될 때마다 로그인 상태 확인
  }, []);

  // "글 쓰기" 버튼 클릭 핸들러
  const handleWriteButtonClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 사용 가능합니다!");
    }
    // 여기에 글 쓰기 버튼을 클릭했을 때의 로직을 추가할 수 있습니다.
  };

  const openModal = (board) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const itemsPerPage = 4;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const boardList = async () => {
    try {
      const rsp = await AxiosApi.boardMain();
      setOriginalBoards(rsp.data);
      setTotalItemsCount(rsp.data.length);
      setBoards(rsp.data.slice(0, itemsPerPage)); // 처음 로드 시 첫 페이지 데이터로 설정
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    boardList();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setBoards(originalBoards.slice(startIndex, endIndex));
  }, [page, originalBoards]);

  const handleSearch = () => {
    setLoading(true); // 검색이 시작될 때 로딩 상태 활성화

    // 임의의 로딩 시간 설정 (예: 2초)
    setTimeout(() => {
      if (searchTerm === "") {
        setBoards(originalBoards.slice(0, itemsPerPage));
        setTotalItemsCount(originalBoards.length);
      } else {
        const filteredBoards = originalBoards.filter(
          (board) =>
            board.title &&
            board.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setBoards(filteredBoards.slice(0, itemsPerPage));
        setTotalItemsCount(filteredBoards.length);
      }
      setLoading(false); // 검색이 완료되면 로딩 상태 비활성화
    }, 2000); // 2초로 설정
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const MyWrite = () => {
    // 현재 로그인된 사용자의 아이디와 게시글 작성자의 아이디를 비교하여 필터링
    const myBoards = originalBoards.filter(
      (board) => board.id === localStorage.getItem("id")
    );
    setBoards(myBoards); // 필터링된 게시글로 상태(State) 업데이트
    setTotalItemsCount(myBoards.length); // 총 아이템 수 업데이트
  };

  return (
    <>
      <Toggle />
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Title>게시판</Title>

          <Boardhead>
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
                setLoading(true);
              }}
            />

            <Link to={isLoggedIn ? "/askme/board/write" : "/login"}>
              <Btn>
                <BtnWrite
                  loggedIn={isLoggedIn}
                  onClick={isLoggedIn ? null : handleWriteButtonClick}
                >
                  글 쓰기
                </BtnWrite>
              </Btn>
            </Link>
            <Btn>
              <BtnMyWrite onClick={MyWrite}>내가 쓴 글</BtnMyWrite>
            </Btn>
            <Link to="/askme">
              <Exit src={exit} />
            </Link>
          </Boardhead>
          <Loading>{loading && <PacmanLoader />}</Loading>
          <Tdfont>
            <table>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {boards &&
                  boards.map((board) => (
                    <tr key={board.classNo} onClick={() => openModal(board)}>
                      <td>{board.classNo}</td>
                      <td>{board.title}</td>
                      <td>{board.nickname}</td>
                      <td>{board.join}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tdfont>
        </Container>
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

        {isModalOpen && (
          <BoardModal board={selectedBoard} onClose={closeModal} />
        )}
      </motion.div>
    </>
  );
};

export default Board;
