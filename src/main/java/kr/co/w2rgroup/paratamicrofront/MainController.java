package kr.co.w2rgroup.paratamicrofront;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.w2rgroup.paratamicrofront.service.IPCheckerService;
import kr.co.w2rgroup.paratamicrofront.util.W2RCommon;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import java.util.Locale;

@Slf4j
@Controller
public class MainController {

    @Autowired
    private IPCheckerService ipCheckerService;

    @Autowired
    private LocaleResolver localeResolver;

    @GetMapping(value = "/")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response, @RequestParam(required = false) String device, @RequestParam(required = false) String language) {
        ModelAndView mav = new ModelAndView();

        String lang = "ko";
        String ip = W2RCommon.getUserIP(request);
        Boolean checked = ipCheckerService.checkIPInRange(ip);
        if (!checked) {
            lang = "en";
        }

        if(language != null) {
            lang = language;
        }
        log.info("lang : " + lang);
        String isDevice = W2RCommon.isMobile(request);
        if(device != null) {
            isDevice = device;
        }
        log.info("device : " + isDevice);

//         mav.setViewName(isDevice + "/" + lang);
        mav.setViewName("pc/ko");
        mav.addObject("lang", lang);
        Locale newLocale = new Locale(lang);
        localeResolver.setLocale(request, response, newLocale);

        return mav;
    }

    @GetMapping(value = "/{language}")
    public ModelAndView indexLang(HttpServletRequest request, HttpServletResponse response, @RequestParam(required = false) String device, @PathVariable String language) {
        ModelAndView mav = new ModelAndView();

        String lang = language;
        if(lang.equals("kr")){
            lang = "ko";
        }

        log.info("lang : " + lang);
        String isDevice = W2RCommon.isMobile(request);
        if(device != null) {
            isDevice = device;
        }
        log.info("device : " + isDevice);

//         mav.setViewName(isDevice + "/" + lang);
        mav.setViewName("pc/ko");

        mav.addObject("lang", lang);

        log.info("getViewName: " + mav.getViewName());

        Locale newLocale = new Locale(lang);
        localeResolver.setLocale(request, response, newLocale);

        return mav;
    }



    @GetMapping("/naver70de4b65f8beb11af353ef7c34831a18.html")
    public ResponseEntity<byte[]> serveNaverVerificationFile() throws IOException {
        ClassPathResource resource = new ClassPathResource("naver/naver70de4b65f8beb11af353ef7c34831a18.html");
        byte[] content = resource.getInputStream().readAllBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "text/html;charset=UTF-8");

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }

    @GetMapping("/google58a86ac5aec034e8.html")
    public ResponseEntity<byte[]> serveGoogleVerificationFile() throws IOException {
        ClassPathResource resource = new ClassPathResource("google/google58a86ac5aec034e8.html");
        byte[] content = resource.getInputStream().readAllBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "text/html;charset=UTF-8");

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }


}
