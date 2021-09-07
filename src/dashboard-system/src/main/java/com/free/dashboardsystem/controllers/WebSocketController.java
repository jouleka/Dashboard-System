package com.free.dashboardsystem.controllers;

import com.free.dashboardsystem.models.WidgetDataModel;
import com.free.dashboardsystem.models.WidgetDataModelPie;
import com.free.dashboardsystem.models.WidgetFrequenceValueModel;
import com.free.dashboardsystem.models.WidgetModel;
import com.free.dashboardsystem.repos.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private WidgetRepository widgetRepository;

    private WidgetDataModel widgetData = new WidgetDataModel();

    private WidgetDataModelPie widgetDataModelPie = new WidgetDataModelPie();

    private ArrayList<Double> arrayList = new ArrayList<>();

    @GetMapping("/widgetdata")
    @Scheduled(fixedRateString = "${widgetFrequency}")
    public void reportFrequency() {
        List<WidgetModel> widgetModelList = widgetRepository.findAll();

        for(WidgetModel widget : widgetModelList) {
            if(widget.getChartType().equals("line") || widget.getChartType().equals("bar") || widget.getChartType().equals("pie")) {
                ArrayList<Double> energyConsumption = new ArrayList<>();
                ArrayList<Double> heatData = new ArrayList<>();
                ArrayList<Double> temperatureData = new ArrayList<>();
                ArrayList<Double> gasCostData = new ArrayList<>();
                ArrayList<Double> acidEmissionData = new ArrayList<>();
                ArrayList<Double> companyBudgetData = new ArrayList<>();

                double energySum = 0;
                double heatSum = 0;
                double temperatureDataSum = 0;
                double gasConstsSum = 0;
                double acidEmissionSum = 0;
                double companyBudgetSum = 0;

                if(arrayList.size() <= 10){
                    energyConsumption.add(new Random().nextDouble() * 100);
                    heatData.add(new Random().nextDouble() * 100);
                    temperatureData.add(new Random().nextDouble() * 100);
                    gasCostData.add(new Random().nextDouble() * 100);
                    acidEmissionData.add(new Random().nextDouble() * 100);
                    companyBudgetData.add(new Random().nextDouble() * 100);
                }else {
                    return;
                }

                for(Double num : energyConsumption) {
                    energySum += num;
                }

                for(Double num : heatData) {
                    heatSum += num;
                }

                for(Double num : gasCostData) {
                    gasConstsSum += num;
                }

                for(Double num : temperatureData) {
                    temperatureDataSum += num;
                }

                for(Double num : acidEmissionData) {
                    acidEmissionSum += num;
                }

                for(Double num : companyBudgetData) {
                    companyBudgetSum += num;
                }

                double energyAverage = (energySum / energyConsumption.size());
                double heatDataAverage = (heatSum / heatData.size());
                double gasCostAverage = (gasConstsSum / gasCostData.size());
                double temperatureAverage = (temperatureDataSum / temperatureData.size());
                double acidEmissionAverage = (acidEmissionSum / acidEmissionData.size());
                double companyBudgetAverage = (companyBudgetSum / companyBudgetData.size());


                widgetData.setEnergyConsumption(energyAverage);
                widgetData.setHeatData(heatDataAverage);
                widgetData.setTemperatureData(temperatureAverage);
                widgetData.setGasCosts(gasCostAverage);
                widgetData.setAcidEmission(acidEmissionAverage);
                widgetData.setCompanyBudget(companyBudgetAverage);
                template.convertAndSend("/topic/notification", widgetData);
//                System.out.println(widgetData.toString());

            }else if(widget.getChartType().equals("newPie")) {
                ArrayList<Double> energyConsumption = new ArrayList<>();
                ArrayList<Double> heatData = new ArrayList<>();
                ArrayList<Double> temperatureData = new ArrayList<>();
                ArrayList<Double> gasCostData = new ArrayList<>();
                ArrayList<Double> acidEmissionData = new ArrayList<>();
                ArrayList<Double> companyBudgetData = new ArrayList<>();

                int energyConsumptionValue = 0;
                int heatDataValue = 0;
                int temperatureDataValue = 0;
                int gasCostValue = 0;
                int acidEmissionValue = 0;
                int companyBudgetValue = 0;

                if(arrayList.size() <= 10){
                    energyConsumption.add(new Random().nextDouble() * 10);
                    heatData.add(new Random().nextDouble() * 10);
                    temperatureData.add(new Random().nextDouble() * 10);
                    gasCostData.add(new Random().nextDouble() * 10);
                    acidEmissionData.add(new Random().nextDouble() * 10);
                    companyBudgetData.add(new Random().nextDouble() * 10);
                }else {
                    return;
                }

                Set<Double> energySet = new HashSet<Double>(energyConsumption);
                Set<Double> heatSet = new HashSet<Double>(heatData);
                Set<Double> temperatureSet = new HashSet<Double>(temperatureData);
                Set<Double> gasCostSet = new HashSet<Double>(gasCostData);
                Set<Double> acidEmissionSet = new HashSet<Double>(acidEmissionData);
                Set<Double> companyBudgetSet = new HashSet<Double>(companyBudgetData);

                List<WidgetFrequenceValueModel> energyConsumptionFrequency = new ArrayList<>();
                List<WidgetFrequenceValueModel> heatDataFrequency = new ArrayList<>();
                List<WidgetFrequenceValueModel> temperatureDataFrequency = new ArrayList<>();
                List<WidgetFrequenceValueModel> acidEmissionFrequency = new ArrayList<>();
                List<WidgetFrequenceValueModel> gasCostFrequency = new ArrayList<>();
                List<WidgetFrequenceValueModel> companyBudgetFrequency = new ArrayList<>();

                for(Double num : energySet) {
                    System.out.println(num + ": " + Collections.frequency(energyConsumption, num));
                    energyConsumptionValue = Collections.frequency(energyConsumption, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                        widgetFrequenceValueModel.setValue(num);
                        widgetFrequenceValueModel.setFrequency(energyConsumptionValue);
                    energyConsumptionFrequency.add(widgetFrequenceValueModel);
                }

                for(Double num : heatSet) {
                    System.out.println(num + ": " + Collections.frequency(heatData, num));
                    heatDataValue = Collections.frequency(heatData, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                    widgetFrequenceValueModel.setValue(num);
                    widgetFrequenceValueModel.setFrequency(heatDataValue);
                    heatDataFrequency.add(widgetFrequenceValueModel);
                }

                for(Double num : temperatureSet) {
                    System.out.println(num + ": " + Collections.frequency(temperatureData, num));
                    temperatureDataValue = Collections.frequency(temperatureData, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                    widgetFrequenceValueModel.setValue(num);
                    widgetFrequenceValueModel.setFrequency(temperatureDataValue);
                    temperatureDataFrequency.add(widgetFrequenceValueModel);
                }

                for(Double num : gasCostSet) {
                    System.out.println(num + ": " + Collections.frequency(gasCostData, num));
                    gasCostValue = Collections.frequency(gasCostData, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                    widgetFrequenceValueModel.setValue(num);
                    widgetFrequenceValueModel.setFrequency(gasCostValue);
                    gasCostFrequency.add(widgetFrequenceValueModel);
                }

                for(Double num : acidEmissionSet) {
                    System.out.println(num + ": " + Collections.frequency(acidEmissionData, num));
                    acidEmissionValue = Collections.frequency(acidEmissionData, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                    widgetFrequenceValueModel.setValue(num);
                    widgetFrequenceValueModel.setFrequency(acidEmissionValue);
                    acidEmissionFrequency.add(widgetFrequenceValueModel);
                }

                for(Double num : companyBudgetSet) {
                    System.out.println(num + ": " + Collections.frequency(companyBudgetData, num));
                    companyBudgetValue = Collections.frequency(companyBudgetData, num);
                    WidgetFrequenceValueModel widgetFrequenceValueModel = new WidgetFrequenceValueModel();
                    widgetFrequenceValueModel.setValue(num);
                    widgetFrequenceValueModel.setFrequency(companyBudgetValue);
                    companyBudgetFrequency.add(widgetFrequenceValueModel);
                }


                widgetDataModelPie.setEnergyConsumption(energyConsumptionFrequency);
                widgetDataModelPie.setHeatData(heatDataFrequency);
                widgetDataModelPie.setTemperatureData(temperatureDataFrequency);
                widgetDataModelPie.setGasCosts(gasCostFrequency);
                widgetDataModelPie.setAcidEmission(acidEmissionFrequency);
                widgetDataModelPie.setCompanyBudget(companyBudgetFrequency);
                template.convertAndSend("/topic/notification", widgetDataModelPie);
            }
        }

    }

}
