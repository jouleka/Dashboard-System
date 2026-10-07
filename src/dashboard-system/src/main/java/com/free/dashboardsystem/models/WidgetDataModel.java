package com.free.dashboardsystem.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WidgetDataModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(onConstructor_ = @JsonCreator)
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

