package com.team.mini.controller;

import org.springframework.web.bind.annotation.*;

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

}
