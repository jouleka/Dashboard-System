package com.free.dashboardsystem.models;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "WidgetModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@PropertySource("classpath:dataSource.properties")
public class WidgetModel {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String widgetName;

    private String widgetDescription;

    private String datasource;

    @NonNull
    private String chartType;

    @NonNull
    private ArrayList<String> widgetDataModels;

    @Value("${widgetFrequency}")
    private double frequency;

    private String dashboardId;

    private int cols = 1;
    private int rows = 1;
    private int x = 1;
    private int y = 1;
//    @NonNull
//    private LocalDateTime date;
//
//    @NonNull
//    private List<DataInformationModel> dataInformation;
}
