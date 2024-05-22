import "./board.css"; // 스타일 파일 import
import logosearch from "../images/search.png";
import exit from "../images/exit.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";
import Footer from "../customComponent/Footer";
import Pagination from "react-js-pagination";
import BoardModal from "./boardModal";

const Container = styled.div`
  display: flex;
  height: auto;

  margin: 10vh auto auto auto; /* 위아래는 100px, 좌우는 자동으로 중앙에 정렬됩니다. */
  padding: 0px; //그냥 여백

  border-radius: 10px;
  text-align: center; /* 내용을 가운데 정렬합니다. */
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
  justify-content: center; /* 세로 방향 중앙 정렬 */
  max-width: 430px;

  table {
    border-collapse: separate; /* 셀 사이의 경계를 분리합니다. */
    border-spacing: 0 10px; /* 셀 사이의 간격을 조절합니다. */
    width: 100%;
    margin: 0px;
    border-top: 3px solid black;
  }
  th {
    font-size: 30px;
  }
  td {
    font-size: 20px;
    border-bottom: 3px solid black;
    padding-bottom: 10px; /* 보더 라인과 콘텐츠 간의 간격을 조절합니다. */
  }
`;

const Searchlogo = styled.img`
  width: 30px; /* 아이콘의 크기를 적절히 조절합니다 */
  height: 30px;
  cursor: pointer; /* 아이콘에 커서 포인터 추가 */
  margin-right: 80px;
`;

const Exit = styled.img`
  width: 50px; /* 아이콘의 크기를 적절히 조절합니다 */
  height: 50px;
  cursor: pointer; /* 아이콘에 커서 포인터 추가 */
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;
const Title = styled.div`
  width: 100px;
  border-bottom: 3px solid black; /* 밑줄을 추가합니다. */
  font-size: 40px;
  height: 40px;
`;

const ContentWrapper = styled.div`
  margin-top: 50px; /* 버튼과 게시판 사이의 간격을 조절합니다. */
`;

const Boardhead1 = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  width: 180px;
  height: 40px;
  padding: 5px;
  margin-right: 10px;
  border: 3px solid black;
  font-family: "DoHyeon-Regular", sans-serif;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */

  font-size: 18px;
  width: 100px;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
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

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
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

// const Tdfont = styled.div`
//   background-color: white;

//   table {
//     border-collapse: separate; /* 셀 사이의 경계를 분리합니다. */
//     border-spacing: 0 10px; /* 셀 사이의 간격을 조절합니다. */
//     width: 100%;
//     margin: 10px;
//   }

//   td {
//     padding: 20px; /* 간격 조절을 위한 패딩 추가 */
//     font-size: 20px;
//     min-width: 140px;
//     border-bottom: 3px solid black;
//   }

//   th {
//     font-size: 30px;
//     min-width: 220px;
//   }
// `;

const BtnWrite = styled.div``;

const BtnMyWrite = styled.div``;

const BoardM = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalBoards, setOriginalBoards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 4;

  const openModal = (board) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터 키가 눌렸을 때 검색 실행
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
      <Toggle></Toggle>
      <motion.div
        /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Title>게시판</Title>
          <ContentWrapper>
            <Link to="/askme/board/write">
              <Btn>
                <BtnWrite>글 쓰기</BtnWrite>
              </Btn>
            </Link>
            <Btn>
              <BtnMyWrite onClick={MyWrite}>내가 쓴 글</BtnMyWrite>
            </Btn>
          </ContentWrapper>
          <Boardhead1>
            <SearchInput
              placeholder="검색 제목 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Searchlogo src={logosearch} onClick={handleSearch} />
            <Link to="/askme">
              <Exit src={exit} />
            </Link>
          </Boardhead1>

          <table>
            {boards &&
              boards.map((board) => (
                <>
                  <tr key={board.classNo} onClick={() => openModal(board)}>
                    <th>{board.title}</th>
                  </tr>
                  <tr
                    key={`${board.classNo}_info`}
                    onClick={() => openModal(board)}
                  >
                    <td>{board.nickname}</td>
                    <td>{board.join}</td>
                  </tr>
                </>
              ))}
          </table>
        </Container>
        <PageStyle>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PageStyle>
        {isModalOpen && (
          <BoardModal board={selectedBoard} onClose={closeModal} />
        )}
      </motion.div>
      <Footer top={1000} mtop={800} />
    </>
  );
};

export default BoardM;
