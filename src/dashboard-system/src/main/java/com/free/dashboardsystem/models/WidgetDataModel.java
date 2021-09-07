package com.free.dashboardsystem.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WidgetDataModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class WidgetDataModel {

    private double temperatureData;
    private double gasCosts;
    private double heatData;
    private double acidEmission;
    private double companyBudget;
    private double energyConsumption;

}

