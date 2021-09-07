package com.free.dashboardsystem.services;

import com.free.dashboardsystem.models.DashboardModel;
import com.free.dashboardsystem.models.WidgetModel;
import com.free.dashboardsystem.repos.DashboardRepository;
import com.free.dashboardsystem.repos.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WidgetService {

    @Autowired
    private Environment environment;

    @Autowired
    WidgetRepository widgetRepository;

    @Autowired
    DashboardRepository dashboardRepository;

    public void FrequencyValue() {
        WidgetModel widgetModel = new WidgetModel();
        widgetModel.setFrequency(Double.parseDouble(environment.getProperty("widget.frequency")));
        System.out.println(widgetModel.getFrequency());
    }

    public ResponseEntity<WidgetModel> addWidget(WidgetModel widgetModel) {

//        System.out.println(widgetModel.getDashboardId());
        if (widgetModel.getWidgetName().isEmpty() || widgetModel.getChartType().isEmpty() || widgetModel.getWidgetDataModels().isEmpty()) {
            return new ResponseEntity<>(widgetModel, HttpStatus.BAD_REQUEST);
        }

        widgetRepository.insert(widgetModel);
        return new ResponseEntity<>(widgetModel, HttpStatus.OK);
    }

    public ResponseEntity<WidgetModel> updateWidget(WidgetModel widgetModel) {

//        System.out.println(widgetModel.getDashboardId());
        if (widgetModel.getWidgetName().isEmpty() || widgetModel.getChartType().isEmpty() || widgetModel.getWidgetDataModels().isEmpty()) {
            return new ResponseEntity<>(widgetModel, HttpStatus.BAD_REQUEST);
        }

        widgetRepository.save(widgetModel);
        return new ResponseEntity<>(widgetModel, HttpStatus.OK);
    }

    public List<WidgetModel> listDashboardWidgetById(String id) {

        Optional<DashboardModel> dashboardModel = dashboardRepository.findById(id);
        dashboardModel.get().setDate(LocalDateTime.now());
        dashboardRepository.save(dashboardModel.get());
//        System.out.println(dashboardModel.get().getId());
        List<WidgetModel> widgetModelList = widgetRepository.findAll();

        widgetModelList.removeIf(widget -> !widget.getDashboardId().equals(dashboardModel.get().getId()));
        return widgetRepository.saveAll(widgetModelList);

    }

    public List<WidgetModel> saveCoordinates(List<WidgetModel> widgetModelList) {

       return widgetRepository.saveAll(widgetModelList);
    }
}
