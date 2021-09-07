package com.free.dashboardsystem.controllers;

import com.free.dashboardsystem.models.DashboardModel;
import com.free.dashboardsystem.repos.DashboardRepository;
import com.free.dashboardsystem.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    DashboardRepository dashboardRepository;

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/list")
    public List<DashboardModel> getDashboardList() {
        return dashboardRepository.findAll();
    }

    @GetMapping("list/recently-used")
    public List<DashboardModel> getRecentlyUsedDashboardList() {
        return dashboardService.recentlyUsedDashboard();
    }

    @GetMapping("list/recently-used-online")
    public List<DashboardModel> getRecentlyUsedAndOnlineDashboardList() {
        return dashboardService.recentlyUsedAndOnlineDashboard();
    }

    @GetMapping("list/online")
    public List<DashboardModel> getOnlineDashboardList() {
        return dashboardService.OnlineDashboards();
    }

    @GetMapping("list/offline")
    public List<DashboardModel> getOfflineDashboardList() {
        return dashboardService.OfflineDashboards();
    }

    @GetMapping("/list/{id}")
    public Optional<DashboardModel> getDashboardById(@PathVariable String id) {
        return dashboardRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<DashboardModel> addDashboard(@RequestBody DashboardModel dashboardModel) {
        return dashboardService.addDashboard(dashboardModel);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DashboardModel> updateDashboard(@RequestBody DashboardModel dashboardModel) {
        return dashboardService.updateDashboard(dashboardModel);
    }

    @PutMapping("/status-update/{id}")
    public boolean statusUpdateDashboard(@PathVariable String id) {
        return dashboardService.dashboardStatus(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDashboardById(@PathVariable String id) {
        dashboardService.deleteDashboard(id);
    }
}
