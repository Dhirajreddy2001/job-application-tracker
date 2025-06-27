package com.ApplicationTracker.JAT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @Autowired
    @Qualifier("customRedisTemplate")
    private RedisTemplate<String,String> redisTemplate;

    @GetMapping("/store")
    public String storeValue(){
        redisTemplate.opsForValue().set("test:key", "Testing Redis");
        return "Stored Value";
    }

    @GetMapping("/fetch")
    public String fetchValue()
    {
        String value = redisTemplate.opsForValue().get("test:key");
        return value != null ? value : "key not found";
    }
}
