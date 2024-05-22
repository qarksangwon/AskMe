package com.team.mini.controller;


import com.team.mini.dao.ChatDAO;
import com.team.mini.vo.ChatRoomVO;
import com.team.mini.websocket.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins ="http://192.168.10.17:3000" )
@RestController
@RequiredArgsConstructor
@RequestMapping("/askme")
public class ChatController {
    ChatDAO cDao = new ChatDAO();
    private final ChatService chatService;


    //GET 채팅방 여부 조회, true - 있음, false 없음
    @GetMapping("/chatmain")
    public ResponseEntity<Boolean> existRoom(@RequestParam String roomId) {
        System.out.println(roomId+"--------");
        boolean isTrue = cDao.checkRoom("roomId",roomId);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }

    @PostMapping("/chatmain")
    public ResponseEntity<Integer> makeRoom(@RequestBody ChatRoomVO vo){
        System.out.println(vo.getRoomId() + vo.getId()+"--------");
        ChatRoomVO newRoom = chatService.createRoom(vo.getRoomId(), vo.getId());
        boolean isTrue = false;
        System.out.println(isTrue);
        if(newRoom != null) return ResponseEntity.ok(1);
        else return ResponseEntity.ok(0);
        // 리턴값 1 이상이면 잘 들어감, 0이면 안들어감
    }

    @GetMapping("/chatdelete")
    public ResponseEntity<Integer> delRoom(@RequestParam String id){
        System.out.println("del id : " + id);
        int isTrue = cDao.delRoom(id);
        System.out.println(isTrue);
        return ResponseEntity.ok(isTrue);
    }


}
