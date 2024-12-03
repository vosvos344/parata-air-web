package kr.co.w2rgroup.paratamicrofront;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.w2rgroup.paratamicrofront.service.IPCheckerService;
import kr.co.w2rgroup.paratamicrofront.util.W2RCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    @Autowired
    private IPCheckerService ipCheckerService;

    @GetMapping(value = "/")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mav = new ModelAndView();

        String ip = W2RCommon.getUserIP(request);
        String lang = "ko";
        Boolean checked = ipCheckerService.checkIPInRange(ip);
        if(!checked){
            lang = "en";
        }

        String device = W2RCommon.isMobile(request);
        mav.setViewName(device + "_" + lang);

        return mav;
    }
}
