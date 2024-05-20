package com.team.mini.dao;

import com.team.mini.vo.BoardVO;

import com.team.mini.utils.Common;

import java.sql.Connection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BoardDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<BoardVO> Boardselect() {
        List<BoardVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection(); // 데이터베이스 연결
            stmt = conn.createStatement(); // Statement 객체 생성
            String sql = "SELECT * FROM BOARDTB ORDER BY CLASSNO DESC";
            rs = stmt.executeQuery(sql); // 쿼리 실행

            // 결과 집합을 반복하며 BoardVo 객체로 변환 후 리스트에 추가
            while (rs.next()) {
                int classno = rs.getInt("CLASSNO");
                String title = rs.getString("TITLE");
                String content = rs.getString("CONTENT");
                String nickname = rs.getString("NICKNAME");
                String profile = rs.getString("PROFILE");
                String userid = rs.getString("ID");
                Date join = rs.getDate("WRITEDATE");

                BoardVO vo = new BoardVO();
                vo.setClassNo(classno);
                vo.setTitle(title);
                vo.setContent(content);
                vo.setNickname(nickname);
                vo.setJoin(join);
                list.add(vo);

            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);

        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }

//    public List<BoardVO> searchBoardByKeyword(String keyword) { //검색한 거 찾기
//        List<BoardVO> list = new ArrayList<>();
//        try {
//            conn = Common.getConnection(); // 데이터베이스 연결
//            stmt = conn.createStatement(); // Statement 객체 생성
//            String sql = "SELECT * FROM boardtb WHERE title LIKE '%%'"; // 조회 쿼리
//            rs = stmt.executeQuery(sql); // 쿼리 실행
//
//            // 결과 집합을 반복하며 BoardVo 객체로 변환 후 리스트에 추가
//            while (rs.next()) {
//                int classno = rs.getInt("CLASSNO");
//                String title = rs.getString("TITLE");
//                String content = rs.getString("CONTENT");
//                String nickname = rs.getString("NICKNAME");
//                String profile = rs.getString("PROFILE");
//                String userid = rs.getString("USERID");
//                Date join = rs.getDate("WRITEDATE");
//
//                BoardVO vo = new BoardVO();
//                vo.setClassNo(classno);
//                vo.setTitle(title);
//                vo.setContent(content);
//                vo.setNickname(nickname);
//                vo.setJoin(join);
//                list.add(vo);
//
//            }
//            Common.close(rs);
//            Common.close(stmt);
//            Common.close(conn);
//
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//        return list;
//    }
}
