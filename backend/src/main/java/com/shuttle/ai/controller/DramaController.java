package com.shuttle.ai.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/dramas")
public class DramaController {

    /**
     * 查询短剧项目列表 API 接口示例
     */
    @GetMapping("/list")
    public Map<String, Object> listDramas() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "success");

        List<Map<String, Object>> dramas = new ArrayList<>();
        Map<String, Object> drama1 = new HashMap<>();
        drama1.put("id", "drama-1001");
        drama1.put("title", "赛博朋克：重生传奇");
        drama1.put("episodes", 10);
        drama1.put("status", "COMPLETED");
        dramas.add(drama1);

        result.put("data", dramas);
        return result;
    }
}
