import "./board.css"; // 스타일 파일 import
import logosearch from "../images/search.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: auto;
  width: 80vw;
  margin: 10vh auto auto auto; /* 위아래는 100px, 좌우는 자동으로 중앙에 정렬됩니다. */
  padding: 120px; //그냥 여백
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* 내용을 가운데 정렬합니다. */
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
  justify-content: center; /* 세로 방향 중앙 정렬 */
`;

const Searchlogo = styled.img`
  width: 30px; /* 아이콘의 크기를 적절히 조절합니다 */
  height: 30px;
  cursor: pointer; /* 아이콘에 커서 포인터 추가 */
  margin-right: 100px;
`;

const Title = styled.div`
  width: 100px;
  border-bottom: 3px solid black; /* 밑줄을 추가합니다. */
  font-size: 40px;
`;

const Boardhead = styled.div`
  padding-bottom: 20px;
  border-bottom: 3px solid black;
  margin-top: 80px;

  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  margin-bottom: 20px;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  width: 180px;
  padding: 5px;
  margin-right: 10px;
  border: 3px solid black;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  width: 100px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 30px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const BtnWrite = styled.div``;

const BtnMyWrite = styled.div``;

const Board = () => {
  return (
    <Container>
      <Title>게시판</Title>

      <Boardhead>
        <SearchInput placeholder="검색 제목 입력" />

        <Searchlogo src={logosearch} />
        <Btn>
          <BtnWrite>글 쓰기</BtnWrite>
        </Btn>
        <Btn>
          <BtnMyWrite>내가 쓴 글</BtnMyWrite>
        </Btn>
      </Boardhead>
      <table>
        <tr>
          <th>NO.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
        <tr>
          <td>1</td>
          <td>게시글 1 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
        <tr>
          <td>2</td>
          <td>게시글 2 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
        <tr>
          <td>3</td>
          <td>게시글 3 입니다.</td>
          <td>김준석</td>
          <td>2022-05-18</td>
        </tr>
      </table>
    </Container>
  );
};

export default Board;
