import "./board.css"; // 스타일 파일 import
import logosearch from "../images/search.png";
import exit from "../images/exit.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import Toggle from "../customComponent/Toggle";

const Container = styled.div`
  display: flex;
  height: auto;

  margin: 10vh auto auto auto; /* 위아래는 100px, 좌우는 자동으로 중앙에 정렬됩니다. */
  padding: 120px; //그냥 여백
  background-color: #ececec;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  }
  th {
    font-size: 30px;
    margin-top: 200px;
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
  margin-bottom: 10px;
  border-bottom: 3px solid black;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  width: 180px;
  height: 40px;
  padding: 5px;
  margin-right: 10px;
  border: 3px solid black;
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
  const [boards, setBoards] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalBoards, setOriginalBoards] = useState(""); // 원본 게시물 목록을 저장할 상태 추가

  const boardList = async () => {
    try {
      const rsp = await AxiosApi.boardMain(); // 전체 목록 가져오기
      setBoards(rsp.data);
      setOriginalBoards(rsp.data); // 원본 게시물 목록 설정
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    boardList();
  }, []);

  const handleSearch = () => {
    if (searchTerm === "") {
      // 검색어가 비어 있으면 전체 목록 보여주기
      setBoards(originalBoards); // 원본 게시물 목록으로 재설정
    } else {
      // 검색어에 해당하는 게시물 필터링
      const filteredBoards = originalBoards.filter((board) =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // 필터링된 결과를 보여주기
      setBoards(filteredBoards);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 엔터 키가 눌렸을 때 검색 실행
      handleSearch();
    }
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
              <BtnMyWrite>내가 쓴 글</BtnMyWrite>
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
                  <tr key={board.classNo}>
                    <th>{board.title}</th>
                  </tr>
                  <tr key={`${board.classNo}_info`}>
                    <td>{board.nickname}</td>
                    <td>{board.join}</td>
                  </tr>
                </>
              ))}
          </table>
        </Container>
      </motion.div>
    </>
  );
};

export default BoardM;
