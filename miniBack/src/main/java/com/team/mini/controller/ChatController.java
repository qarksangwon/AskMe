package com.team.mini.controller;


import com.team.mini.dao.ChatDAO;
import com.team.mini.vo.ChatRoomVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/askme")
public class ChatController {
    ChatDAO cDao = new ChatDAO();

    //GET 채팅방 여부 조회, true - 있음, false 없음
    @GetMapping("/chatmain")
    public ResponseEntity<Boolean> existRoom(@RequestParam String roomId) {
        System.out.println(roomId);
        boolean isTrue = cDao.checkRoom(roomId);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/chatRoomMake")
    public ResponseEntity<Boolean> makeRoom(@RequestParam ChatRoomVO vo){
        System.out.println(vo.getRoomId() + vo.getID());
        boolean isTrue = cDao.makeRoom(vo.getRoomId(),vo.getID());
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }
}
