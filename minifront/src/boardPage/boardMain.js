import logosearch from "../images/search.png";
import exit from "../images/exit.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";
import Pagination from "react-js-pagination";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 90vw;
  margin: 10vh auto auto auto;
  padding: 120px;
  background-color: #ececec;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    padding-left: 8px;
    padding-right: 8px;
    font-weight: bold;
    color: black;
  }
`;

const BtnWrite = styled.div``;

const BtnMyWrite = styled.div``;

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalBoards, setOriginalBoards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

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
    if (searchTerm === "") {
      setBoards(originalBoards.slice(0, itemsPerPage));
      setTotalItemsCount(originalBoards.length);
    } else {
      const filteredBoards = originalBoards.filter((board) =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBoards(filteredBoards.slice(0, itemsPerPage));
      setTotalItemsCount(filteredBoards.length);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
            <Searchlogo src={logosearch} onClick={handleSearch} />
            <Link to="/askme/board/write">
              <Btn>
                <BtnWrite>글 쓰기</BtnWrite>
              </Btn>
            </Link>
            <Btn>
              <BtnMyWrite>내가 쓴 글</BtnMyWrite>
            </Btn>
            <Link to="/askme">
              <Exit src={exit} />
            </Link>
          </Boardhead>
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
                    <tr key={board.classNo}>
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
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PageStyle>
      </motion.div>
    </>
  );
};

export default Board;
