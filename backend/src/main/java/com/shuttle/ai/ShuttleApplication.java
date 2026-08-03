package com.shuttle.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShuttleApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShuttleApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🚀 剧梭短剧 AI 核心业务后端 (Java) 启动成功！");
        System.out.println("   服务监听端口: 8080");
        System.out.println("   基础 API 地址: http://localhost:8080/api");
        System.out.println("=================================================");
    }
}
