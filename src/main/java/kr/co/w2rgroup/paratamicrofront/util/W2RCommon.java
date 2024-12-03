package kr.co.w2rgroup.paratamicrofront.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class W2RCommon {
    public static String isMobileByCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("device".equals(cookie.getName()) && "mobile".equals(cookie.getValue())) {
                    return "mobile";
                }else if ("device".equals(cookie.getName()) && "pc".equals(cookie.getValue())) {
                    return "pc";
                }
            }
        }
        return null;
    }

    public static boolean isMobileByAgent(String userAgent) {
        String[] mobileUserAgents = {"Mobile", "Android", "iPhone", "iPad", "iPod", "Windows Phone"};
        for (String mobileUserAgent : mobileUserAgents) {
            if (userAgent.contains(mobileUserAgent)) {
                return true;
            }
        }
        return false;
    }

    public static String isMobile(HttpServletRequest request){
        String userAgent = request.getHeader("User-Agent");
        String deviceType = isMobileByCookie(request);

        if(deviceType == null && userAgent != null){
            deviceType = isMobileByAgent(userAgent) ? "mobile" : "pc";
        }
        return deviceType;
    }


    public static String getUserIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if ("0:0:0:0:0:0:0:1".equals(ip) || "::1".equals(ip)) {
            ip = "127.0.0.1"; // IPv4로 변환
        }

        return ip;
    }
}
