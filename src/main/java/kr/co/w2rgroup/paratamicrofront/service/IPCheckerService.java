package kr.co.w2rgroup.paratamicrofront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Service
public class IPCheckerService {

    @Autowired
    private ResourceLoader resourceLoader;

    public static long ipToLong(String ipAddress) {
        try {
            InetAddress inetAddress = InetAddress.getByName(ipAddress);
            byte[] octets = inetAddress.getAddress();
            long result = 0;
            for (byte octet : octets) {
                result = (result << 8) | (octet & 0xFF);
            }
            return result;
        } catch (UnknownHostException e) {
            throw new IllegalArgumentException("Invalid IP address: " + ipAddress);
        }
    }

    // 특정 IP가 대역 내에 포함되는지 확인
    public static boolean isIPInRange(String startIP, String endIP, String targetIP) {
        long start = ipToLong(startIP);
        long end = ipToLong(endIP);
        long target = ipToLong(targetIP);

        return target >= start && target <= end;
    }

    // CSV 파일 읽기 및 확인
    public Boolean checkIPInRange(String targetIP) {
        Resource resource = resourceLoader.getResource("classpath:data/ipv4_list.csv");
        boolean found = false;
        try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split("\t"); // CSV 파일의 구분자 (\t)
                if (fields.length >= 2) {
                    String startIP = fields[0];
                    String endIP = fields[1];

                    if (isIPInRange(startIP, endIP, targetIP)) {
                        System.out.println("IP " + targetIP + " is in range: " + startIP + " - " + endIP);
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                System.out.println("IP " + targetIP + " is not in any range.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return found;
    }
}
