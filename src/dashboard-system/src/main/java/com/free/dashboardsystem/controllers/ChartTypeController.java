package com.free.dashboardsystem.controllers;

import com.free.dashboardsystem.models.ChartTypeModel;
import com.free.dashboardsystem.repos.ChartTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/chartType")
public class ChartTypeController {

    @Autowired
    ChartTypeRepository chartTypeRepository;

    @GetMapping("/list")
    public List<ChartTypeModel> getChartTypeList() {
        return chartTypeRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public Optional<ChartTypeModel> getChartTypeById(@PathVariable String id) {
        return chartTypeRepository.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<ChartTypeModel> addChartType(@RequestBody ChartTypeModel chartTypeModel) {
        chartTypeRepository.insert(chartTypeModel);
        return new ResponseEntity<>(chartTypeModel, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ChartTypeModel> updateChartType(@RequestBody ChartTypeModel chartTypeModel) {
        chartTypeRepository.save(chartTypeModel);
        return new ResponseEntity<>(chartTypeModel, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteChartType(@PathVariable String id) {
        chartTypeRepository.deleteById(id);
    }
}
