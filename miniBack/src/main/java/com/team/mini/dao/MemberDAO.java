package com.team.mini.dao;

import com.team.mini.utils.Common;
import com.team.mini.vo.MemberVO;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemberDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 로그인
    public boolean loginCheck(String id, String password) {
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            String sql = "SELECT * FROM USERTB WHERE ID = " + "'" + id + "'";

            rs = stmt.executeQuery(sql);

            while (rs.next()) { // 읽을 데이타가 있으면 true
                String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
                String sqlPwd = rs.getString("PASSWORD");
                if (id.equals(sqlId) && password.equals(sqlPwd)) {
                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 아이디 및 닉네임 중복 체크
    public boolean checkIdAndNickname(String check, String value) {
        boolean isTrue = false;

        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql;
            if(check.equals("id")) sql = "SELECT ID, NICKNAME FROM USERTB WHERE ID = '" + value + "'";
            else sql = "SELECT ID, NICKNAME FROM USERTB WHERE nickname = '" + value + "'";
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                isTrue = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        }
        return isTrue;
    }

    // 회원정보 조회
    public List<MemberVO> memberSelect(String getName) {
        List<MemberVO> list = new ArrayList<>();
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

                MemberVO vo = new MemberVO();
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

    // 아이디 찾기 테스트
    public String memberId(String name, String email) {
        int result = 0;
        String getId = null;
        String sql = "SELECT ID FROM USERTB WHERE NAME = " + "'" + name + "'" + " AND " + "EMAIL = " + "'" + email + "'";
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if(rs.next()) {
                getId = rs.getString("ID");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(stmt);
        Common.close(conn);
        return getId;

    }

    // 비밀번호 찾기 테스트
    // 아이디와 이메일이 일치하면 이메일을 발송하고 인증코드를 입력하면 비밀번호를 수정 가능
    public boolean isIdAndEmailMatch(String id, String email) {
        boolean isMatch = false;
        try {
            conn = Common.getConnection();
            String sql = "SELECT COUNT(*) FROM USERTB WHERE ID = ? AND EMAIL = ?";
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            pStmt.setString(2, email);
            rs = pStmt.executeQuery();
            if (rs.next() && rs.getInt(1) > 0) {
                isMatch = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isMatch;
    }
    // 비밀번호 재설정
    public boolean updatePassword(String id, String newPassword) {
        boolean isUpdated = false;
        try {
            conn = Common.getConnection();
            String sql = "UPDATE USERTB SET PASSWORD = ? WHERE ID = ?";
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, newPassword);
            pStmt.setString(2, id);
            int rows = pStmt.executeUpdate();
            if (rows > 0) {
                isUpdated = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(pStmt);
            Common.close(conn);
        }
        return isUpdated;
    }


    // 회원 가입
    public boolean memberRegister(MemberVO member) {
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

    // 회원 정보 수정
    public boolean memberUpdate(String id, String password, String nickname) {
        int result = 0;
        String sql = "UPDATE USERTB SET PASSWORD = ?, NICKNAME = ? WHERE ID = ?";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, password);
            pStmt.setString(2, nickname);
            pStmt.setString(3, id);
            result = pStmt.executeUpdate();
            System.out.println("회원정보 수정 결과 확인 : " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(pStmt);
        Common.close(conn);
        if (result >= 1) return true;
        else return false;
    }

    // 회원 탈퇴
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