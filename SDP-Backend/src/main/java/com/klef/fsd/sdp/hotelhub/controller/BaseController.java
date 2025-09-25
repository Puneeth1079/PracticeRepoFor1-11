package com.klef.fsd.sdp.hotelhub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @GetMapping("/hotelapi/basecase")
    public String home() {
        return "Backend is running successfully!";
    }
}
