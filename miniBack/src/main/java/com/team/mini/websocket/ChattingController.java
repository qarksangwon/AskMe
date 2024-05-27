package com.team.mini.websocket;

import com.team.mini.vo.ChatMessageVO;
import com.team.mini.vo.ChatRoomVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://192.168.10.17:3000")
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/askme")
public class ChattingController {
    private final ChatService chatService;
    private final  WebSocketHandler webSocketHandler;

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<List<ChatMessageVO>> getChatMessages(@PathVariable String roomId){
        List<ChatMessageVO> messages = chatService.getMessageHistory(roomId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/rooms/{roomId}/enter")
    public ResponseEntity<String> enterRoom(@PathVariable String roomId, @RequestBody WebSocketSession session){
        ChatRoomVO room = chatService.findRoomId(roomId);
        chatService.addSession(roomId,session);
        return ResponseEntity.ok("Session add");
    }



}
