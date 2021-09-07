package com.free.dashboardsystem.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;

@Document(collection = "WidgetDataModelPie")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class WidgetDataModelPie {

    private List<WidgetFrequenceValueModel> temperatureData;
    private List<WidgetFrequenceValueModel> gasCosts;
    private List<WidgetFrequenceValueModel> heatData;
    private List<WidgetFrequenceValueModel> acidEmission;
    private List<WidgetFrequenceValueModel> companyBudget;
    private List<WidgetFrequenceValueModel> energyConsumption;

}