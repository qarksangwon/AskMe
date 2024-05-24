package com.team.mini.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.mini.vo.ChatMessageVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.zip.Inflater;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper; // JSON 문자열로 변환하기 위한 객체
    private final ChatService chatService; // 채팅방 관련 비즈니스 로직을 처리할 서비스
    private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>(); // 세션과 채팅방 ID를 매핑할 맵


    //클라이언트 -> 서버 연결 시 호출 메소드
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String payload = message.getPayload();
        log.warn("{}" , payload);

        // JSON 문자열 ChatMessageVO 변환
        ChatMessageVO chatMessage = objectMapper.readValue(payload, ChatMessageVO.class);

        String roomId = chatMessage.getRoomId();
        System.out.println(roomId);
        // 세션과 roomId 매칭
        sessionRoomIdMap.put(session, chatMessage.getRoomId());
        if(chatMessage.getType() == ChatMessageVO.MessageType.ENTER){
            chatService.addSession(roomId,session);
            System.out.println("handleTextMessage run : " + session);
        } else if(chatMessage.getType() == ChatMessageVO.MessageType.CLOSE){
            chatService.removeSession(roomId,session);
        }else if(chatMessage.getType() == ChatMessageVO.MessageType.CANVAS){
            chatService.sendMessageToAll(roomId,chatMessage);
        }else{
            chatService.sendMessageToAll(roomId,chatMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws  Exception {
        //세션과 매핑된 채팅방 ID 가져옴
        log.warn("afterConnectionClosed : {}",session);
        System.out.println("afterConnection closed run : " + session);
        String roomId = sessionRoomIdMap.remove(session);
        if(roomId != null){
            ChatMessageVO chatMessage = new ChatMessageVO();
            chatMessage.setType(ChatMessageVO.MessageType.CLOSE);
            chatService.removeSession(roomId,session);
        }
    }
}
