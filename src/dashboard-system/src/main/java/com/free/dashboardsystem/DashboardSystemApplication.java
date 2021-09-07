package com.free.dashboardsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DashboardSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(DashboardSystemApplication.class, args);
    }

}
