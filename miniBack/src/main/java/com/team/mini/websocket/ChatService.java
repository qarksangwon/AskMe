package com.team.mini.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.mini.dao.ChatDAO;
import com.team.mini.vo.ChatMessageVO;
import com.team.mini.vo.ChatRoomVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private ChatDAO cDao = new ChatDAO();

    private final ObjectMapper objectMapper; // JSON 문자열로 변환 객체
    private Map<String, ChatRoomVO> chatRooms; // 채팅방 정보 담을 맵
    // String - key - roomId
    @PostConstruct
    private void init(){
        //채팅방 정보 담을 맵
        chatRooms = new LinkedHashMap<>();
        List<ChatRoomVO> roomsFromDb = cDao.roomList();
        for (ChatRoomVO room : roomsFromDb) {
            chatRooms.put(room.getRoomId(), room); // Map에 채팅방 정보 저장
        }
    }
    public ChatRoomVO createRoom(String roomId, String userId) {
        ChatRoomVO newRoom = new ChatRoomVO(roomId, userId);
        int result = cDao.makeRoom(roomId, userId);

        if (result > 0) {
            chatRooms.put(roomId, newRoom);
            return newRoom;
        } else {
            throw new RuntimeException("Failed to create chat room");
        }
    }

    public List<ChatRoomVO> findAllRoom(){ // 모든 채팅방 정보 리스트 반환
        return new ArrayList<>(chatRooms.values());
    }
    public ChatRoomVO findRoomId(String roomId){
        return chatRooms.get(roomId);
    }


    // 채팅방에 세션 추가
    public void addSession(String roomId, WebSocketSession session) {
        ChatRoomVO room = findRoomId(roomId);
        if (room != null) {
            room.getSessions().add(session);
            log.debug("Session added: " + session + " to room: " + roomId);
        } else {
            log.error("Room not found: " + roomId);
        }
    }

    // 채팅방에서 세션 제거
    public void removeSession(String roomId, WebSocketSession session) {
        ChatRoomVO room = findRoomId(roomId);
        if (room != null) {
            room.getSessions().remove(session);
            log.debug("Session removed: " + session + " from room: " + roomId);
        } else {
            log.error("Room not found: " + roomId);
        }
    }

    public void sendMessageToAll(String roomId, ChatMessageVO message) {
        ChatRoomVO room = findRoomId(roomId);
        if (room != null) {
            cDao.insertMessage(message);
            for (WebSocketSession session : room.getSessions()) {
                sendMessage(session, message);
            }
        } else {
            log.error("Room not found: " + roomId);
        }
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            System.out.println("sendMessage run!");
            System.out.println("Session : " + session);
            System.out.println("message : " + message);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    public List<ChatMessageVO> getMessageHistory(String roomId) {
        return cDao.chatList(roomId); // DB에서 메시지 내역 가져오기
    }
}
