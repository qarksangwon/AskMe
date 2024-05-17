package com.team.mini.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;
import static com.team.mini.utils.Common.CORS_ORIGIN;


@CrossOrigin(origins = CORS_ORIGIN)
@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    // JavaMailSender 타입으로 변수 생성
    private JavaMailSender mailSender;

    @GetMapping("/mail")
    public ResponseEntity<String> sendMail(@RequestParam String id) {
        System.out.println("인증 번호 받을 email : " + id);

        // 임의의 인증 번호 생성
        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String tempPw = String.valueOf(random.nextInt(max - min + 1) + min);
        System.out.println("인증 번호 : " + tempPw);

        // 이메일에 들어갈 내용
        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">Email 인증 테스트입니다.</p>"
                + "<p></p>"
                + "<p style=\"font-size:16px; display: block;\">아래의 인증 번호를 입력해야 합니다...</p>"
                + "<p></p>"
                + "<div style=\"font-size:20px; font-style:bold; width: 1000px; height:50px; border: 1px solid #c6c6c6; display: block;\">" + tempPw + "</div>"
                + "</div>";

        // 이메일로 전송
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("1103bsj@naver.com");
            helper.setTo(id);
            helper.setSubject("Email 인증번호 테스트입니다.");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);


        return new ResponseEntity<>(tempPw,HttpStatus.OK);
    }
}