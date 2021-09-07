package com.free.dashboardsystem.controllers;

import com.free.dashboardsystem.models.WidgetModel;
import com.free.dashboardsystem.repos.WidgetRepository;
import com.free.dashboardsystem.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/widget-controller")
public class WidgetController {

    @Autowired
    WidgetRepository widgetRepository;

    @Autowired
    WidgetService widgetService;

    @GetMapping("/list")
    public List<WidgetModel> getAllWidgets() {
        return widgetRepository.findAll();
    }

    @GetMapping("/list/widget/{id}")
    public List<WidgetModel> getDashboardWidgetById(@PathVariable String id) {
        return widgetService.listDashboardWidgetById(id);
    }

    @GetMapping("/list/{id}")
    public Optional<WidgetModel> getWidgetById(@PathVariable String id) {
        return widgetRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<WidgetModel> addWidget(@RequestBody WidgetModel widgetModel) {
        return widgetService.addWidget(widgetModel);
    }

    @PutMapping("/update-coordinates")
    public List<WidgetModel> saveCoordinates(@RequestBody List<WidgetModel> widgetModelList) {
        return widgetService.saveCoordinates(widgetModelList);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<WidgetModel> updateWidget(@RequestBody WidgetModel widgetModel) {
        return widgetService.updateWidget(widgetModel);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteWidgetById(@PathVariable String id) {
        widgetRepository.deleteById(id);
    }
}
