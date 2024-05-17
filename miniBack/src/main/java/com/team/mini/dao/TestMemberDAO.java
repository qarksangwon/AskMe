package com.team.mini.dao;

import com.team.mini.utils.Common;
import com.team.mini.vo.TestMemberVO;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TestMemberDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 회원 가입 여부 확인
    public boolean regMemberCheck(String id) {
        boolean isNotReg = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM USERTB WHERE ID = " + "'" + id +"'";
            rs = stmt.executeQuery(sql);
            if(rs.next()) isNotReg = false;
            else isNotReg = true;
        } catch(Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isNotReg; // 가입 되어 있으면 false, 가입이 안되어 있으면 true
    }
    // 로그인 체크
    public boolean loginCheck(String id, String pwd) {
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            String sql = "SELECT * FROM USERTB WHERE ID = " + "'" + id + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) { // 읽은 데이타가 있으면 true
                String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
                String sqlPwd = rs.getString("PASSWORD");
                System.out.println("ID : " + sqlId);
                System.out.println("PASSWORD : " + sqlPwd);
                if(id.equals(sqlId) && pwd.equals(sqlPwd)) {
                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 회원정보 조회
    public List<TestMemberVO> memberSelect(String getName) {
        List<TestMemberVO> list = new ArrayList<>();
        String sql = null;
        System.out.println("NAME : " + getName);
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            if(getName.equals("ALL")) sql = "SELECT * FROM USERTB";
            else sql = "SELECT * FROM USERTB WHERE NAME = " + "'" + getName + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                String id = rs.getString("ID");
                String pwd = rs.getString("PASSWORD");
                String name = rs.getString("NAME");
                String email = rs.getString("EMAIL");
                Date join = rs.getDate("JOIN");

                TestMemberVO vo = new TestMemberVO();
                vo.setId(id);
                vo.setPassword(pwd);
                vo.setName(name);
                vo.setEmail(email);
                vo.setJoin(join);
                list.add(vo);
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 회원 가입
    public boolean memberRegister(TestMemberVO member) {
        int result = 0;
        String sql = "INSERT INTO USERTB(ID, PASSWORD, NAME, NICKNAME, EMAIL) VALUES(?, ?, ?, ?, ?)";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, member.getId());
            pStmt.setString(2, member.getPassword());
            pStmt.setString(3, member.getName());
            pStmt.setString(4, member.getNickname());
            pStmt.setString(5, member.getEmail());
            result = pStmt.executeUpdate();
            System.out.println("회원 가입 DB 결과 확인 : " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);

        if(result == 1) return true;
        else return false;
    }

    public boolean memberDelete(String id) {
        int result = 0;
        String sql = "DELETE FROM USERTB WHERE ID = ?";

        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            result = pStmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);
        if(result == 1) return true;
        else return false;
    }

}