package com.team.mini.dao;

import com.team.mini.utils.Common;
import com.team.mini.vo.ChatMessageVO;
import com.team.mini.vo.ChatRoomVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ChatDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public boolean checkRoom(String param, String value) {
        boolean isTrue = false;
        String sql;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            if(param.equals("roomId"))  sql = "SELECT * FROM CHATROOM WHERE ROOMID = " + "'" + value + "'";
            else sql = "SELECT * FROM CHATROOM WHERE ID = " + "'" + value + "'" ;
            rs = stmt.executeQuery(sql);
            if(rs.next()) {
                isTrue = true;
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        }
        return isTrue; // 해당 RoomID가 있다면 true, 없다면 false
    }

    public int makeRoom(String roomId, String userId){
        boolean isMyChat = false;
        int isTrue = 0;
        String fq = "SELECT * FROM CHATROOM WHERE id = ?";
        String q = "INSERT INTO CHATROOM VALUES(?,?)";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(fq);
            pStmt.setString(1,userId);
            rs = pStmt.executeQuery();
            if(rs.next()){
                isMyChat = true;
            }
            if(!isMyChat){
                pStmt= conn.prepareStatement(q);
                pStmt.setString(1,roomId);
                pStmt.setString(2, userId);
                isTrue = pStmt.executeUpdate();
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isTrue;
    }

    public int delRoom(String userId){
        int isTrue = 0;
        String q = "DELETE FROM CHATROOM WHERE ID = ?";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            pStmt.setString(1,userId);
            isTrue = pStmt.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isTrue;
    }

    public List<ChatMessageVO> chatList(String roomId){
        String q = "SELECT * FROM CHATTB WHERE roomId = ?";
        List<ChatMessageVO> chatList = new ArrayList<>();
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            pStmt.setString(1, roomId);
            rs = pStmt.executeQuery();
            while(rs.next()){
                ChatMessageVO chatMessageVO = new ChatMessageVO();
                chatMessageVO.setNickName(rs.getString("NICKNAME"));
                chatMessageVO.setMessage(rs.getString("MESSAGE"));
                chatMessageVO.setRoomId(rs.getString("ROOMID"));
                chatMessageVO.setType(ChatMessageVO.MessageType.valueOf("TALK"));
                chatList.add(chatMessageVO);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return chatList;
    }

    public int insertMessage(ChatMessageVO message){
        int isTrue = 0;
        String q = "INSERT INTO CHATTB (ROOMID, NICKNAME, MESSAGE) VALUES (?, ?, ?)";
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            pStmt.setString(1,message.getRoomId());
            pStmt.setString(2, message.getNickName());
            pStmt.setString(3, message.getMessage());
            isTrue = pStmt.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return isTrue;
    }

    public List<ChatRoomVO> roomList(){
        String q = "SELECT * FROM CHATROOM";
        List<ChatRoomVO> roomList = new ArrayList<>();
        try{
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(q);
            rs = pStmt.executeQuery();
            while(rs.next()){
                ChatRoomVO chatRoom = new ChatRoomVO(
                        rs.getString("ROOMID"),
                        rs.getString("ID")
                );
                roomList.add(chatRoom);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        }
        return roomList;
    }
}
