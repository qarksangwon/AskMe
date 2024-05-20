package com.team.mini.controller;

import com.team.mini.dao.BoardDAO;
import com.team.mini.vo.BoardVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/askme")

public class BoardController {
    BoardDAO dao = new BoardDAO();


    //GET 회원 조회
    @GetMapping("/board")
    public ResponseEntity<List<BoardVO>> boardList() {
        List<BoardVO> list = dao.Boardselect();
        System.out.println(list);
        return ResponseEntity.ok(list);
    }
}
