package com.team.mini.controller;

import com.team.mini.vo.MemberVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class TestController {
    @GetMapping("/name")
    public String getName(){
        return "GET 방식 테스트. Name : 박상원";
    }

    // 매개변수를 URL에 담아 요청할 때
    @GetMapping("/variable/{var}")
    public String getVariable(@PathVariable String var){
        return var;
    }
    @GetMapping("/variable2/{var}")
    public String getVariable2(@PathVariable("var") String var){
        return var;
    }

    // GET 방식으로 정보 전달
    @GetMapping("/request")
    public String getRequestParam(@RequestParam String name,
                                  @RequestParam String email,
                                  @RequestParam String company){
        return name + " " + email + " " + company;
    }

    @GetMapping("/members")
    public List<Map<String, Object>> findMembers() {
        List<Map<String, Object>> members = new ArrayList<>();
        for(int i = 1; i <= 20; i++){
            Map<String, Object> member = new HashMap<>();
            member.put("id",i);
            member.put("name", "개발자"+i);
            members.add(member);
        }
        return members;
    }

    @GetMapping("/members2")
    public ResponseEntity<List<MemberVO>> listMember() {
        List<MemberVO> list = new ArrayList<>();
        for(int i = 0; i<10; i++){
            MemberVO vo = new MemberVO();
            vo.setId("id" + i);
            vo.setPwd("pwd"+ i);
            vo.setName("개발자" + i);
            vo.setEmail("email"+i+"@gmail.com");
            list.add(vo);
        }
        return ResponseEntity.ok(list);
    }
}
