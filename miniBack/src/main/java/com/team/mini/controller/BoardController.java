package com.team.mini.controller;

import com.team.mini.dao.BoardDAO;
import com.team.mini.vo.BoardVO;
import com.team.mini.vo.MemberVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin(origins ="http://localhost:3000" )
@RestController
@RequestMapping("/askme")

public class BoardController {
    private final BoardDAO dao;
    private final HttpSession session;

    public BoardController(BoardDAO dao, HttpSession session) {
        this.dao = dao;
        this.session = session;
    }

    //GET 회원 조회
    @GetMapping("/board")
    public ResponseEntity<List<BoardVO>> boardList() {
        List<BoardVO> list = dao.Boardselect();
        System.out.println(list);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/board/write")
    public ResponseEntity<Boolean> boardRegister(@RequestBody BoardVO board) {
        boolean isTrue = dao.boardRegister(board);
        return ResponseEntity.ok(isTrue);
    }



    @GetMapping("/board/delete")
    public ResponseEntity<Boolean> delboard(@RequestParam int classNo){
        System.out.println("del classNo : " + classNo);
        boolean isTrue = dao.delboard(classNo);
        return ResponseEntity.ok(isTrue);
    }
//    @GetMapping("/myboard")
//    public ResponseEntity<List<BoardVO>> myBoardList() {
//        MemberVO loggedInUser = (MemberVO) session.getAttribute("loggedInUser");
//        if (loggedInUser == null) {
//            return ResponseEntity.status(401).build(); // Unauthorized
//        }
//        List<BoardVO> myList = dao.selectBoardsByUserId(loggedInUser.getId());
//        return ResponseEntity.ok(myList);
//    }

}
