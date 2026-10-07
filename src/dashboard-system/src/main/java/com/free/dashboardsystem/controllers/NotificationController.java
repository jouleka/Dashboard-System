package com.free.dashboardsystem.controllers;

import com.free.dashboardsystem.pojos.Notifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"})
@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate template;

    // Initialize Notifications
    private Notifications notifications = new Notifications(0);

    @PostMapping("/notify")
    public String getNotification() {

        // Increment Notification by one
        notifications.increment();

        // Push notifications to front-end
        template.convertAndSend("/topic/notification", "Hello");

        return "Notifications successfully sent to Angular !";
    }
}
