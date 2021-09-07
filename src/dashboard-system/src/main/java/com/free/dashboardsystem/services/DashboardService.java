package com.free.dashboardsystem.services;

import com.free.dashboardsystem.logic.Sorting;
import com.free.dashboardsystem.models.DashboardModel;
import com.free.dashboardsystem.models.WidgetModel;
import com.free.dashboardsystem.repos.DashboardRepository;
import com.free.dashboardsystem.repos.WidgetRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {

    @Autowired
    private Environment environment;

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private WidgetRepository widgetRepository;

    public ResponseEntity<DashboardModel> addDashboard(DashboardModel dashboardModel) {

        if(dashboardModel.getDashboardName().isEmpty()) {
            return new ResponseEntity<>(dashboardModel, HttpStatus.BAD_REQUEST  );
        }
//        dashboardModel.setDate(LocalDateTime.now());
        dashboardRepository.insert(dashboardModel);
        return new ResponseEntity<>(dashboardModel, HttpStatus.OK);
    }

    public List<DashboardModel> recentlyUsedDashboard() {
        List<DashboardModel> dashboardModelList = dashboardRepository.findAll();

        dashboardModelList.removeIf(dashboard1 -> dashboard1.getDate() == null);
        dashboardModelList.removeIf(dashboard -> !dashboard.isStatus());
        dashboardModelList.sort(new Sorting());
        return dashboardRepository.saveAll(dashboardModelList);
    }

    public List<DashboardModel> recentlyUsedAndOnlineDashboard() {
        List<DashboardModel> dashboardModelList = dashboardRepository.findAll();
        dashboardModelList.removeIf(dashboard -> !dashboard.isStatus());
//        dashboardModelList.sort(new Sorting());
        return dashboardRepository.saveAll(dashboardModelList);
    }

    public List<DashboardModel> OnlineDashboards() {
        List<DashboardModel> dashboardModelList = dashboardRepository.findAll();
        dashboardModelList.removeIf(dashboard -> !dashboard.isStatus());
        return dashboardRepository.saveAll(dashboardModelList);
    }

    public List<DashboardModel> OfflineDashboards() {
        List<DashboardModel> dashboardModelList = dashboardRepository.findAll();
        dashboardModelList.removeIf(dashboard -> dashboard.isStatus());
        return dashboardRepository.saveAll(dashboardModelList);
    }

//    public Optional<DashboardModel> widgetListById(String id) {
//        Optional<DashboardModel> dashboardModelById = dashboardRepository.findById(id);
//        dashboardModelById
//    }

    public ResponseEntity<DashboardModel> updateDashboard(DashboardModel dashboardModel) {
        if(dashboardModel.getDashboardName().isEmpty()) {
            return new ResponseEntity<>(dashboardModel, HttpStatus.BAD_REQUEST  );
        }

//        dashboardModel.setDate(LocalDateTime.now());
        dashboardRepository.save(dashboardModel);
        return new ResponseEntity<>(dashboardModel, HttpStatus.OK);
    }

    public boolean dashboardStatus(String id) {
        Optional<DashboardModel> findDashboardById = dashboardRepository.findById(id);

        findDashboardById.get().setStatus(!findDashboardById.get().isStatus());
        dashboardRepository.save(findDashboardById.get());
       return findDashboardById.get().isStatus();
    }

    public void deleteDashboard(String id) {
        Optional<DashboardModel> findDashboardById = dashboardRepository.findById(id);
        List<WidgetModel> widgetModelList = widgetRepository.findAll();

        for(WidgetModel widget : widgetModelList) {
            if(widget.getDashboardId().equals(findDashboardById.get().getId())) {
                widgetRepository.delete(widget);
            }
        }
        dashboardRepository.deleteById(id);
    }

}
