package com.team.mini.controller;


import com.team.mini.dao.ChatDAO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/askme")
public class ChatController {
    ChatDAO cDao = new ChatDAO();

    //GET 채팅방 여부 조회, true - 있음, false 없음
    @GetMapping("/board")
    public ResponseEntity<Boolean> existRoom(@RequestParam String roomId) {
        boolean isTrue = cDao.checkRoom(roomId);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }
}
